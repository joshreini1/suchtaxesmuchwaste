import { scrapeEfficiencySavings } from '../utils/scrapeEfficiencySavings.js';

// Use a sample contribution value
const totalContribution = 1000000; // $1 million as an example

async function run() {
  try {
    console.log('Starting scraper with contribution: $' + totalContribution);
    const results = await scrapeEfficiencySavings(totalContribution);
    console.log(`Successfully scraped ${results.length} efficiency savings items`);
  } catch (error) {
    console.error('Error running scraper:', error);
    process.exit(1);
  }
}

run();