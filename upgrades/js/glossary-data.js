/* ============================================================
   G2G GLOSSARY — Term Database
   Every technical term taught across chapters 1–13.
   { term, definition, firstSeen (chapter number), aliases }
   ============================================================ */

window.G2G_GLOSSARY_TERMS = [
  // ---- Chapter 1 ----
  { term: "Investment Bank", def: "A firm that advises companies on deals (M&A, fundraising) and helps them raise money from investors. Think of it as the middleman between businesses that need capital and people who have it.", firstSeen: 1 },
  { term: "Private Equity", def: "Firms that buy companies using a mix of their own money and borrowed money, improve them, and sell them for a profit — usually over 3–7 years.", firstSeen: 1, aliases: ["PE"] },

  // ---- Chapter 2 ----
  { term: "Revenue", def: "The total money a company earns from selling its products or services before any costs are subtracted. The top line.", firstSeen: 2 },
  { term: "ASP", def: "Average Selling Price — the average price at which each unit is sold. Revenue ÷ Volume.", firstSeen: 2 },
  { term: "Gross Margin", def: "The percentage of revenue left after subtracting the direct cost of making the product. Higher = more money left to cover everything else.", firstSeen: 2 },
  { term: "COGS", def: "Cost of Goods Sold — what it directly costs to make or deliver the product. Raw materials, factory labour, packaging.", firstSeen: 2 },
  { term: "EBITDA", def: "Earnings Before Interest, Taxes, Depreciation & Amortisation — a measure of how much profit the core business operations generate, stripped of financing and accounting choices.", firstSeen: 2, aliases: ["Adjusted EBITDA"] },
  { term: "EBIT", def: "Earnings Before Interest and Taxes — operating profit after depreciation. Closer to 'real' profit than EBITDA because it includes the cost of wearing out assets.", firstSeen: 2 },
  { term: "Net Income", def: "The final profit after every cost, tax, and interest payment. What's actually left for shareholders.", firstSeen: 2 },
  { term: "Operating Leverage", def: "How sensitive profit is to changes in revenue. A business with high fixed costs has high operating leverage — small revenue changes create big profit swings.", firstSeen: 2, aliases: ["DOL", "Degree of Operating Leverage"] },
  { term: "Pricing Power", def: "A company's ability to raise prices without losing customers. The strongest competitive advantage in business.", firstSeen: 2 },
  { term: "SaaS", def: "Software as a Service — software sold as a subscription (monthly/annual fees) rather than a one-time purchase. Usually high margins, recurring revenue.", firstSeen: 2 },

  // ---- Chapter 3 ----
  { term: "Free Cash Flow", def: "The actual cash a business generates after paying for operations and investments. Unlike profit, you can't fake cash — it's either in the bank or it isn't.", firstSeen: 3, aliases: ["FCF"] },
  { term: "Depreciation", def: "Spreading the cost of a physical asset (factory, machine) across its useful life. It's a cost on paper, but no cash leaves the building.", firstSeen: 3, aliases: ["D&A", "Depreciation & Amortisation"] },
  { term: "Amortisation", def: "Same as depreciation, but for intangible assets like patents, software, or brand value.", firstSeen: 3 },
  { term: "Working Capital", def: "The cash tied up in day-to-day operations: money customers owe you, minus money you owe suppliers, plus inventory sitting on shelves.", firstSeen: 3, aliases: ["NWC", "Net Working Capital", "ΔNWC"] },
  { term: "CapEx", def: "Capital Expenditure — money spent on long-term assets like buildings, equipment, or technology. It's an investment in the future, not a day-to-day cost.", firstSeen: 3, aliases: ["Capital Expenditure"] },
  { term: "Cash Conversion", def: "How efficiently a company turns its accounting profit into actual cash. A business can be 'profitable' on paper while running out of cash.", firstSeen: 3 },

  // ---- Chapter 4 ----
  { term: "Gross Profit", def: "Revenue minus the direct cost of goods sold. The first layer of profit — what's left before overhead, salaries, and everything else.", firstSeen: 4 },
  { term: "OpEx", def: "Operating Expenses — the costs of running the business beyond making the product: salaries, rent, marketing, R&D.", firstSeen: 4, aliases: ["Operating Expenses"] },
  { term: "Asset-Heavy", def: "A business model that requires expensive physical infrastructure (factories, vehicles, property) to operate. Higher capital needs, but harder to replicate.", firstSeen: 4 },
  { term: "Asset-Light", def: "A business model that runs mainly on people, software, and ideas rather than physical assets. Lower capital needs, higher margins, faster scaling.", firstSeen: 4 },
  { term: "Unit Economics", def: "The profit and loss analysis of a single unit (one product sold, one customer served). If the unit doesn't work, scaling just multiplies the losses.", firstSeen: 4 },

  // ---- Chapter 5 ----
  { term: "Financial Model", def: "A spreadsheet that projects a company's future performance based on a set of assumptions — revenue growth, margins, costs. The engine behind every deal.", firstSeen: 5 },
  { term: "Driver-Based Forecasting", def: "Building a forecast from real business inputs (number of customers, price per unit, churn rate) rather than just growing last year's numbers by a percentage.", firstSeen: 5 },
  { term: "Sensitivity Analysis", def: "Testing what happens to the output when you change one assumption at a time. Answers the question: 'What if we're wrong about X?'", firstSeen: 5 },

  // ---- Chapter 6 ----
  { term: "LBO", def: "Leveraged Buyout — buying a company using mostly borrowed money (debt), with the company's own cash flow used to pay down that debt over time.", firstSeen: 6, aliases: ["Leveraged Buyout"] },
  { term: "Leverage", def: "Using borrowed money to amplify returns. If the investment does well, you earn more than you put in. If it doesn't, you lose more than you put in.", firstSeen: 6 },
  { term: "Equity", def: "The ownership stake in a business. In a buyout, it's the cash the buyer puts in with their own money — the part that isn't borrowed.", firstSeen: 6 },
  { term: "IRR", def: "Internal Rate of Return — the annualised percentage return on an investment. A 25% IRR means the investment grows at 25% per year, compounded.", firstSeen: 6, aliases: ["Internal Rate of Return"] },
  { term: "MOIC", def: "Multiple on Invested Capital — how many times your money comes back. 3.0x MOIC means you invested €1 and got €3 back.", firstSeen: 6, aliases: ["Multiple on Invested Capital", "Money Multiple"] },
  { term: "Debt Service", def: "The regular payments (interest + principal) a company must make on its borrowed money. Miss a payment and lenders can take control.", firstSeen: 6 },

  // ---- Chapter 7 ----
  { term: "GP", def: "General Partner — the fund manager who makes investment decisions, sources deals, and runs the fund day-to-day.", firstSeen: 7, aliases: ["General Partner"] },
  { term: "LP", def: "Limited Partner — the investors who put money into the fund (pension funds, endowments, wealthy individuals). They provide capital but don't manage deals.", firstSeen: 7, aliases: ["Limited Partner"] },
  { term: "Carry", def: "Carried interest — the GP's share of profits (typically 20%) earned only after returning all capital plus a minimum return to LPs. The big payday.", firstSeen: 7, aliases: ["Carried Interest"] },
  { term: "Management Fee", def: "The annual fee (typically 1.5–2% of committed capital) that GPs charge to cover salaries and operating costs — paid regardless of performance.", firstSeen: 7 },
  { term: "Preferred Return", def: "The minimum annual return (usually 8%) that LPs must receive before the GP earns any carry. Protects investors from paying for mediocre results.", firstSeen: 7, aliases: ["Hurdle Rate"] },
  { term: "Waterfall", def: "The contractual formula that determines the order in which fund profits are distributed between LPs and GPs.", firstSeen: 7, aliases: ["Distribution Waterfall"] },
  { term: "Clawback", def: "A mechanism that forces the GP to return carry if later deals lose money and the overall fund underperforms. Protection against early winners masking later losses.", firstSeen: 7 },
  { term: "Vintage Year", def: "The year a fund starts investing. Used to compare fund performance fairly — a 2019 fund and a 2021 fund operated in very different markets.", firstSeen: 7 },
  { term: "Committed Capital", def: "The total amount LPs have promised to invest in a fund. Not deposited upfront — drawn down deal by deal over 3–5 years.", firstSeen: 7 },
  { term: "DPI", def: "Distributions to Paid-In — how much cash has actually been returned to investors relative to what they put in. The only metric that's real money, not paper gains.", firstSeen: 7, aliases: ["Distributions to Paid-In"] },

  // ---- Chapter 8 ----
  { term: "Capital Structure", def: "The mix of debt and equity used to finance a business. More debt = higher returns if things go well, but higher risk if they don't.", firstSeen: 8 },
  { term: "WACC", def: "Weighted Average Cost of Capital — the blended rate a company pays across all its funding sources. Lower WACC = higher company valuation.", firstSeen: 8, aliases: ["Weighted Average Cost of Capital"] },
  { term: "Cost of Equity", def: "The return shareholders expect for the risk of owning the stock. Unlike debt interest, it's never stated on a bill — but it's very real.", firstSeen: 8 },
  { term: "Cost of Debt", def: "The interest rate a company pays on its borrowings. Cheaper than equity because lenders get paid first and get tax benefits.", firstSeen: 8 },
  { term: "Tax Shield", def: "The tax saving from deducting interest payments. Governments effectively subsidise debt — making borrowing cheaper than it looks on the surface.", firstSeen: 8 },
  { term: "Covenant", def: "A contractual rule in a loan agreement that limits what the borrower can do (e.g., maximum debt level, minimum cash balance). Break it and lenders can take control.", firstSeen: 8, aliases: ["Covenants"] },
  { term: "Senior Debt", def: "The first-in-line borrowing that gets repaid before anyone else if things go wrong. Lowest risk, lowest interest rate.", firstSeen: 8 },
  { term: "Mezzanine", def: "A hybrid of debt and equity — sits between senior debt and equity in the repayment queue. Higher interest than senior, but can convert to ownership.", firstSeen: 8, aliases: ["Mezz", "Mezzanine Debt"] },

  // ---- Chapter 9 ----
  { term: "Trading Comps", def: "Valuing a company by comparing it to similar publicly-traded companies. 'If that company trades at 8× EBITDA, this one should too.'", firstSeen: 9, aliases: ["Trading Comparables", "Comparable Companies"] },
  { term: "Precedent Transactions", def: "Valuing a company based on what acquirers have paid for similar businesses in past deals. Includes a control premium — buyers pay extra for ownership.", firstSeen: 9, aliases: ["Transaction Comps"] },
  { term: "DCF", def: "Discounted Cash Flow — valuing a company by projecting its future cash flows and discounting them back to today's value. The only method that asks 'What should this be worth?' rather than 'What are others paying?'", firstSeen: 9, aliases: ["Discounted Cash Flow"] },
  { term: "Terminal Value", def: "The estimated value of a business beyond the forecast period (usually 5–10 years). Often accounts for 60–80% of total DCF value.", firstSeen: 9 },
  { term: "Discount Rate", def: "The rate used to convert future cash into today's value. Higher rate = future cash is worth less today. Reflects the riskiness of those cash flows.", firstSeen: 9 },
  { term: "EV/EBITDA", def: "Enterprise Value divided by EBITDA — the most common valuation multiple. Lower = cheaper. Allows comparison across companies regardless of how they're financed.", firstSeen: 9 },
  { term: "Football Field", def: "A horizontal bar chart showing valuation ranges from multiple methods (comps, precedents, DCF) side by side. Used in every pitchbook to frame the negotiation.", firstSeen: 9 },

  // ---- Chapter 10 ----
  { term: "Enterprise Value", def: "What the entire business is worth — to all stakeholders (debt holders + equity holders). Think of it as the total price tag.", firstSeen: 10, aliases: ["EV"] },
  { term: "Equity Value", def: "What the shareholders' ownership is worth. Enterprise Value minus debt plus cash. The number that determines the share price.", firstSeen: 10 },
  { term: "EV Bridge", def: "The calculation that converts Enterprise Value into Equity Value by adding cash and subtracting debt. The 'bridge' between what the whole business is worth and what owners get.", firstSeen: 10, aliases: ["Enterprise Value Bridge", "EV-to-Equity Bridge"] },
  { term: "Quality of Earnings", def: "A deep audit of a company's reported profits to find what's real and what's been dressed up. The forensic accounting step before any deal closes.", firstSeen: 10, aliases: ["QofE", "QoE"] },
  { term: "Net Debt", def: "Total borrowings minus cash on hand. The true debt burden — because cash in the bank can immediately be used to pay down loans.", firstSeen: 10 },
  { term: "IFRS 16", def: "An accounting rule that puts leases (office rent, equipment leases) on the balance sheet as debt. Changed how many companies' financials look overnight.", firstSeen: 10 },
  { term: "Working Capital True-Up", def: "An adjustment at deal closing to account for whether the target company's day-to-day cash needs are higher or lower than normal. Prevents the seller from draining cash before handing over the keys.", firstSeen: 10 },

  // ---- Chapter 11 ----
  { term: "M&A", def: "Mergers & Acquisitions — the process of buying, selling, or combining companies. The core of investment banking advisory work.", firstSeen: 11, aliases: ["Mergers & Acquisitions"] },
  { term: "Strategic Buyer", def: "A company buying another company in the same or related industry. Pays more because they can cut overlapping costs and cross-sell products.", firstSeen: 11 },
  { term: "Financial Buyer", def: "A PE fund or investment firm buying a company as a standalone investment. Pays less than strategics but offers management independence.", firstSeen: 11, aliases: ["Financial Sponsor"] },
  { term: "Synergies", def: "Cost savings or revenue gains that come from combining two businesses. 'We can fire one of the two accounting teams' = cost synergy.", firstSeen: 11 },
  { term: "Due Diligence", def: "The deep investigation before a deal closes: financial, legal, commercial, operational. Finding everything that could go wrong before writing the cheque.", firstSeen: 11, aliases: ["DD"] },
  { term: "Control Premium", def: "The extra price a buyer pays above the market value for the right to own and control a company. Typically 20–40% above the share price.", firstSeen: 11 },

  // ---- Chapter 12 ----
  { term: "Goodwill", def: "The amount paid above the fair value of a company's identifiable assets. Represents brand, relationships, reputation — things you can't touch but that have real value.", firstSeen: 12 },
  { term: "Impairment", def: "A write-down of an asset's value when it's worth less than what's recorded on the books. For goodwill, it's essentially admitting: 'We overpaid.'", firstSeen: 12 },
  { term: "Purchase Price Allocation", def: "The process of assigning the acquisition price to specific assets and liabilities of the bought company. What's left over becomes goodwill.", firstSeen: 12, aliases: ["PPA"] },
  { term: "IFRS", def: "International Financial Reporting Standards — the global rulebook for how companies report their financial numbers. Used in most countries outside the US.", firstSeen: 12 },

  // ---- Chapter 13 (Reference) ----
  { term: "Accretion/Dilution", def: "Whether a deal increases (accretive) or decreases (dilutive) the buyer's earnings per share. The quick test of whether a deal 'works' for the acquirer's shareholders.", firstSeen: 13 },
  { term: "LTV", def: "Lifetime Value — the total revenue a business expects from a single customer over the entire relationship. Must be 3×+ the cost of acquiring them.", firstSeen: 13, aliases: ["Lifetime Value", "Customer Lifetime Value", "CLV"] },
  { term: "CAC", def: "Customer Acquisition Cost — how much it costs to win one new customer (marketing, sales, onboarding). The denominator in the LTV/CAC ratio.", firstSeen: 13, aliases: ["Customer Acquisition Cost"] },
  { term: "Churn", def: "The rate at which customers leave. In SaaS, 5% monthly churn means half your customers are gone within a year.", firstSeen: 13, aliases: ["Churn Rate"] },
  { term: "ARR", def: "Annual Recurring Revenue — the predictable, subscription-based revenue a SaaS company earns each year. The single most important SaaS metric.", firstSeen: 13, aliases: ["Annual Recurring Revenue"] },
  { term: "MRR", def: "Monthly Recurring Revenue — ARR divided by 12. Used for tracking month-to-month growth in subscription businesses.", firstSeen: 13, aliases: ["Monthly Recurring Revenue"] },
  { term: "Net Revenue Retention", def: "Whether existing customers are spending more or less over time, after accounting for churn. Above 100% = customers grow faster than they leave. The holy grail.", firstSeen: 13, aliases: ["NRR", "Net Dollar Retention", "NDR"] },
];
