import { WastefulSpending } from '../types/calculator';

export const getWastefulSpending = (): WastefulSpending[] => {
  return [
    {
      id: "ws1",
      name: "Unused Office Space",
      description: "Federal buildings sitting empty or underused",
      amount: 1500000000,
      category: "Property",
      agency: "GSA",
      href: "https://doge.gov/wasteful-spending/unused-office-space"
    },
    {
      id: "ws2",
      name: "Overlapping IT Systems",
      description: "Redundant software systems performing the same functions",
      amount: 1200000000,
      category: "Technology",
      agency: "Various",
      href: "https://doge.gov/wasteful-spending/overlapping-it"
    },
    {
      id: "ws3",
      name: "Improper Payments",
      description: "Payments made in incorrect amounts or to ineligible recipients",
      amount: 175000000000,
      category: "Financial",
      agency: "Treasury",
      href: "https://doge.gov/wasteful-spending/improper-payments"
    },
    {
      id: "ws4",
      name: "Military Equipment Waste",
      description: "Unnecessary or unwanted equipment purchases",
      amount: 25000000000,
      category: "Defense",
      agency: "DoD",
      href: "https://doge.gov/wasteful-spending/military-waste"
    },
    {
      id: "ws5",
      name: "Uncompetitive Contracts",
      description: "No-bid contracts leading to inflated prices",
      amount: 35000000000,
      category: "Procurement",
      agency: "Various",
      href: "https://doge.gov/wasteful-spending/uncompetitive-contracts"
    },
    {
      id: "ws6",
      name: "Paper-based Processes",
      description: "Manual paperwork that could be digitized",
      amount: 5000000000,
      category: "Administration",
      agency: "Various",
      href: "https://doge.gov/wasteful-spending/paper-processes"
    },
    {
      id: "ws7",
      name: "Empty Buildings Maintenance",
      description: "Building upkeep for vacant federal properties",
      amount: 1700000000,
      category: "Property",
      agency: "GSA",
      href: "https://doge.gov/wasteful-spending/empty-buildings"
    },
    {
      id: "ws8",
      name: "Duplicate Research Grants",
      description: "Multiple agencies funding similar research",
      amount: 800000000,
      category: "Research",
      agency: "Various",
      href: "https://doge.gov/wasteful-spending/duplicate-research"
    },
    {
      id: "ws9",
      name: "Unused Software Licenses",
      description: "Paid software that sits unused",
      amount: 1200000000,
      category: "Technology",
      agency: "Various"
    },
    {
      id: "ws10",
      name: "Conference Spending",
      description: "Excessive spending on government conferences",
      amount: 500000000,
      category: "Travel",
      agency: "Various"
    },
    {
      id: "ws11",
      name: "Outdated Legacy Systems",
      description: "Ancient computer systems that cost more to maintain",
      amount: 7500000000,
      category: "Technology",
      agency: "Various"
    },
    {
      id: "ws12",
      name: "Duplication of Services",
      description: "Different agencies providing the same service",
      amount: 45000000000,
      category: "Administration",
      agency: "Various"
    },
    {
      id: "ws13",
      name: "Uncollected Taxes",
      description: "Tax revenue lost due to IRS inefficiency",
      amount: 600000000000,
      category: "Financial",
      agency: "IRS"
    },
    {
      id: "ws14",
      name: "Improper Medicare Payments",
      description: "Payments for ineligible Medicare services",
      amount: 52000000000,
      category: "Healthcare",
      agency: "HHS"
    },
    {
      id: "ws15",
      name: "Improper Medicaid Payments",
      description: "Payments for ineligible Medicaid services",
      amount: 37000000000,
      category: "Healthcare",
      agency: "HHS"
    },
    {
      id: "ws16",
      name: "Fragmented Food Safety",
      description: "15 agencies overseeing food safety",
      amount: 1900000000,
      category: "Health",
      agency: "Various"
    },
    {
      id: "ws17",
      name: "Inefficient Hiring Processes",
      description: "Slow, paper-heavy government hiring",
      amount: 3000000000,
      category: "HR",
      agency: "OPM"
    },
    {
      id: "ws18",
      name: "Unused Medical Supplies",
      description: "Expired and unused medical inventory",
      amount: 800000000,
      category: "Healthcare",
      agency: "HHS"
    },
    {
      id: "ws19",
      name: "Overpaid Contractors",
      description: "Excessive contractor rates compared to market",
      amount: 17000000000,
      category: "Procurement",
      agency: "Various"
    },
    {
      id: "ws20",
      name: "Outdated Nuclear Programs",
      description: "Cold War-era nuclear expenditures",
      amount: 4000000000,
      category: "Energy",
      agency: "DOE"
    },
    {
      id: "ws21",
      name: "Siloed Government Research",
      description: "Lack of research coordination across agencies",
      amount: 2800000000,
      category: "Research",
      agency: "Various"
    },
    {
      id: "ws22",
      name: "Farm Subsidy Mismanagement",
      description: "Payments to non-farming landowners",
      amount: 1900000000,
      category: "Agriculture",
      agency: "USDA"
    },
    {
      id: "ws23",
      name: "SSA Overpayments",
      description: "Improper Social Security payments",
      amount: 8500000000,
      category: "Financial",
      agency: "SSA"
    },
    {
      id: "ws24",
      name: "Duplicative Job Training",
      description: "47 overlapping job training programs",
      amount: 1800000000,
      category: "Employment",
      agency: "Various"
    },
    {
      id: "ws25",
      name: "Identity Theft Tax Fraud",
      description: "Fraudulent tax refunds from identity theft",
      amount: 3100000000,
      category: "Financial",
      agency: "IRS"
    },
    {
      id: "ws26",
      name: "Surplus Military Equipment",
      description: "Purchasing equipment the military doesn't want",
      amount: 9700000000,
      category: "Defense",
      agency: "DoD",
      href: "https://doge.gov/wasteful-spending/surplus-military"
    },
    {
      id: "ws27",
      name: "Inefficient Disaster Response",
      description: "Lack of coordination in emergency management",
      amount: 2100000000,
      category: "Emergency",
      agency: "FEMA"
    },
    {
      id: "ws28",
      name: "Outdated Prescription Data",
      description: "Using paper records for prescriptions",
      amount: 1400000000,
      category: "Healthcare",
      agency: "HHS"
    },
    {
      id: "ws29",
      name: "Fragmented Financial Literacy",
      description: "Multiple agencies with duplicate programs",
      amount: 750000000,
      category: "Education",
      agency: "Various"
    },
    {
      id: "ws30",
      name: "Improper EITC Payments",
      description: "Earned Income Tax Credit payment errors",
      amount: 18500000000,
      category: "Financial",
      agency: "IRS"
    },
    {
      id: "ws31",
      name: "Excessive Print Services",
      description: "Unnecessary government printing",
      amount: 930000000,
      category: "Administration",
      agency: "GPO"
    },
    {
      id: "ws32",
      name: "Antiquated Data Centers",
      description: "Operating inefficient data centers",
      amount: 5700000000,
      category: "Technology",
      agency: "Various"
    },
    {
      id: "ws33",
      name: "Property Management Failures",
      description: "Mismanaged federal real estate",
      amount: 8400000000,
      category: "Property",
      agency: "GSA"
    },
    {
      id: "ws34",
      name: "Transportation Contract Waste",
      description: "Poor oversight of transport contracts",
      amount: 1800000000,
      category: "Transportation",
      agency: "DOT"
    },
    {
      id: "ws35",
      name: "Unused Foreign Aid",
      description: "Unspent foreign assistance funding",
      amount: 4300000000,
      category: "International",
      agency: "State"
    },
    {
      id: "ws36",
      name: "Inefficient Education Grants",
      description: "Overlapping and poorly managed grants",
      amount: 5900000000,
      category: "Education",
      agency: "DOE"
    },
    {
      id: "ws37",
      name: "Duplicative Military Healthcare",
      description: "Multiple healthcare systems for service members",
      amount: 3600000000,
      category: "Defense",
      agency: "DoD"
    },
    {
      id: "ws38",
      name: "NASA Project Overruns",
      description: "Space project budget excesses",
      amount: 2800000000,
      category: "Science",
      agency: "NASA"
    },
    {
      id: "ws39",
      name: "Outdated Weather Systems",
      description: "Inefficient weather detection infrastructure",
      amount: 1100000000,
      category: "Science",
      agency: "NOAA"
    },
    {
      id: "ws40",
      name: "Student Loan Fraud",
      description: "Loans issued to fictional students",
      amount: 950000000,
      category: "Education",
      agency: "DOE"
    },
    {
      id: "ws41",
      name: "Incorrect Tax Refunds",
      description: "Erroneous refunds sent to taxpayers",
      amount: 7800000000,
      category: "Financial",
      agency: "IRS"
    },
    {
      id: "ws42",
      name: "Mismanaged Drug Testing",
      description: "Inefficient substance testing programs",
      amount: 480000000,
      category: "Healthcare",
      agency: "Various"
    },
    {
      id: "ws43",
      name: "Overlap in Science Funding",
      description: "Multiple agencies funding the same research",
      amount: 4100000000,
      category: "Science",
      agency: "Various"
    },
    {
      id: "ws44",
      name: "Obsolete Intellectual Property",
      description: "Maintaining outdated patent systems",
      amount: 620000000,
      category: "Commerce",
      agency: "USPTO"
    },
    {
      id: "ws45",
      name: "Veterans Healthcare Duplication",
      description: "Overlapping care systems for veterans",
      amount: 2900000000,
      category: "Veterans",
      agency: "VA"
    }
  ];
};
