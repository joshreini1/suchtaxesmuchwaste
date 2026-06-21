import { EfficiencySaving } from '../types/calculator';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

/**
 * Fetches efficiency savings data from GitHub repository
 * and stores it in the local repository
 */
export const scrapeEfficiencySavings = async (totalContribution: number): Promise<EfficiencySaving[]> => {
  console.log('Fetching data from GitHub repository...');
  
  // Fetch data from the GitHub repository
  const response = await fetch('https://raw.githubusercontent.com/simonw/scrape-doge-gov/main/api/receipts/overview.json');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }
  
  // Parse the JSON data
  const data = await response.json();
  console.log('Successfully fetched data from GitHub');
  
  // Store the fetched data in the repository
  const dataDir = path.resolve(process.cwd(), 'src/data');
  try {
    await mkdir(dataDir, { recursive: true });
  } catch (err) {
    // Ignore if directory already exists
    if ((err as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw err;
    }
  }
  
  const filePath = path.join(dataDir, 'efficiency-savings.json');
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Data saved to repository at ${filePath}`);
  
  // Process the data into the required format
  // Note: Adapt this mapping based on the actual structure of the JSON from GitHub
  return data.items.map((item: any) => ({
    name: item.title || item.name,
    // Convert to appropriate amount and scale by total contribution
    amount: totalContribution * (parseFloat(item.amount || item.value || '0') / 65000000000),
    description: item.description || item.summary || '',
    href: item.link || `https://doge.gov/receipts/${item.id || encodeURIComponent(item.title || item.name)}`
  }));
};

/**
 * Extract efficiency savings data from HTML content
 */
function extractSavingsData(html: string): Array<{
  name: string;
  amount: number;
  description: string;
  href?: string;
  id?: string;
}> {
  console.log('Parsing HTML to extract efficiency savings data...');
  
  // Extract data from the table in the HTML
  // Looking for patterns like <tr data-savings-id="...">...</tr>
  const savingsRegex = /<tr[^>]*data-savings-id="([^"]+)"[^>]*>[\s\S]*?<td[^>]*class="saving-name"[^>]*>([\s\S]*?)<\/td>[\s\S]*?<td[^>]*class="saving-amount"[^>]*>\$([\d,.]+)B<\/td>[\s\S]*?<td[^>]*class="saving-description"[^>]*>([\s\S]*?)<\/td>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>/g;
  
  const savings: Array<{
    name: string;
    amount: number;
    description: string;
    href: string;
    id: string;
  }> = [];
  
  let match;
  while ((match = savingsRegex.exec(html)) !== null) {
    const [_, id, name, amountStr, description, href] = match;
    
    // Convert amount from string like "$11.8B" to number in billions
    const amount = parseFloat(amountStr.replace(/,/g, '')) * 1000000000;
    
    savings.push({
      id,
      name: name.trim(),
      amount,
      description: description.trim(),
      href
    });
  }
  
  // If regex approach doesn't find matches, try an alternative approach
  if (savings.length === 0) {
    console.log('Regex extraction failed, trying alternative approach...');
    // Look for JSON data embedded in the page
    const jsonDataMatch = html.match(/<script id="savings-data" type="application\/json">([\s\S]*?)<\/script>/);
    
    if (jsonDataMatch && jsonDataMatch[1]) {
      try {
        const jsonData = JSON.parse(jsonDataMatch[1]);
        return jsonData.map((item: any) => ({
          id: item.id,
          name: item.name,
          amount: parseAmount(item.amount),
          description: item.description,
          href: item.href
        }));
      } catch (e) {
        console.error('Failed to parse embedded JSON data:', e);
      }
    }
    
    // If we still haven't found data, extract from any structured content we can find
    const tableRows = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || [];
    for (const row of tableRows) {
      const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/g) || [];
      if (cells.length >= 3) {
        const nameMatch = cells[0].match(/>([^<]+)</);
        const amountMatch = cells[1].match(/>\$([\d,.]+)B</);
        const descMatch = cells[2].match(/>([^<]+)</);
        const hrefMatch = row.match(/href="([^"]+)"/);
        
        if (nameMatch && amountMatch && descMatch) {
          savings.push({
            id: nameMatch[1].trim().toLowerCase().replace(/\s+/g, '-'),
            name: nameMatch[1].trim(),
            amount: parseAmount(amountMatch[1]),
            description: descMatch[1].trim(),
            href: hrefMatch ? hrefMatch[1] : `https://doge.gov/savings/${nameMatch[1].trim().toLowerCase().replace(/\s+/g, '-')}`
          });
        }
      }
    }
  }
  
  return savings;
}

/**
 * Parse amount string to number (in cents)
 */
function parseAmount(amountStr: string): number {
  // Handle various formats like "$11.8B", "11.8 billion", etc.
  const cleaned = amountStr.replace(/[$,]/g, '');
  
  if (cleaned.includes('billion') || cleaned.includes('B')) {
    const number = parseFloat(cleaned.replace(/[^\d.]/g, ''));
    return number * 1000000000; // Convert billions to dollars
  }
  
  if (cleaned.includes('million') || cleaned.includes('M')) {
    const number = parseFloat(cleaned.replace(/[^\d.]/g, ''));
    return number * 1000000; // Convert millions to dollars
  }
  
  return parseFloat(cleaned);
}