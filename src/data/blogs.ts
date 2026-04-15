export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  /** Display date, e.g. "March 15, 2025" */
  date: string;
  /** ISO date for metadata */
  dateIso: string;
  author: string;
  authorRole: string;
  readTimeMinutes: number;
  excerpt: string;
  /** Plain-text paragraphs */
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "gst-amendments-2025-business-guide",
    tag: "GST",
    title: "New GST Amendments 2025: What Every Business Must Know",
    date: "March 15, 2025",
    dateIso: "2025-03-15",
    author: "CA Ranjot Singh",
    authorRole: "Partner, Ranjot Singh & Associates LLP",
    readTimeMinutes: 6,
    excerpt:
      "A practical overview of recent GST changes and what SMEs should review in registrations, invoicing, and return discipline.",
    content: [
      "Goods and Services Tax continues to evolve through notifications, circulars, and periodic budgetary measures. For businesses in Bihar and across India, staying current is not optional—missed compliance often shows up as interest, penalties, or blocked working capital in the form of mismatched credits.",
      "If you are registered under GST, start with a simple health check: confirm that your principal place of business, HSN/SAC mapping, and tax positions on invoices still match your actual supply pattern. Many issues we see in practice trace back to master data that was correct years ago but no longer reflects how the firm operates today.",
      "Pay special attention to e-invoicing thresholds and QR-code requirements if they apply to your turnover band. Where e-invoicing is mandatory, treating it as a back-office afterthought usually creates last-minute scrambles at month-end and unnecessary friction with large buyers.",
      "On the return side, reconcile GSTR-1, GSTR-3B, and books regularly—not only in March. Small monthly variances are easier to fix than a year-end reconciliation exercise under pressure. If you use multiple GSTINs or branches, document inter-branch movements clearly so audits do not turn into fishing expeditions.",
      "Finally, treat GST as a process, not an event. A short quarterly review with your consultant (registration, exemptions, place of supply, export/refund claims) typically costs far less than defending a demand or rebuilding records from incomplete data.",
    ],
  },
  {
    slug: "itr-filing-deadline-checklist",
    tag: "Income Tax",
    title: "ITR Filing Deadline Extended? Here's Your Complete Checklist",
    date: "Feb 28, 2025",
    dateIso: "2025-02-28",
    author: "Ranjot Singh & Associates LLP",
    authorRole: "Editorial team",
    readTimeMinutes: 4,
    excerpt:
      "Whether or not the due date moves, use this checklist so your Income Tax Return is accurate and supported.",
    content: [
      "Extension news spreads quickly on social media, but your compliance clock should still assume the statutory date unless you have official confirmation. Collect Form 16/16A, bank statements, capital-gains statements, and proofs of deductions before you sit down to file.",
      "Match TDS in Form 26AS and AIS with your records. Discrepancies are common and are best resolved with deductors well before the last week of July or the belated deadline, as the case may be.",
      "Pick the correct ITR form and regime (old vs new) only after comparing tax outcomes for your specific income mix—salary, house property, capital gains, and business income each have nuances.",
      "After filing, e-verify immediately and download the acknowledgement. If you prefer our office to review first, bring your documents early; rushed filings are where avoidable errors creep in.",
    ],
  },
  {
    slug: "llp-vs-private-limited-structure",
    tag: "Advisory",
    title: "LLP vs Pvt Ltd: Which Structure Suits Your Business?",
    date: "Jan 20, 2025",
    dateIso: "2025-01-20",
    author: "CA Ranjot Singh",
    authorRole: "Partner, Ranjot Singh & Associates LLP",
    readTimeMinutes: 5,
    excerpt:
      "A high-level comparison to help founders think about liability, compliance load, and fundraising before they incorporate.",
    content: [
      "Choosing between a Limited Liability Partnership and a Private Limited Company is less about which is “better” and more about how you plan to raise money, hire, and grow compliance over the next five years.",
      "An LLP often fits professional services and small partnerships that want flexible internal agreements and lower recurring ROC friction, while still limiting partner liability in ordinary course.",
      "A Private Limited Company is the default path when external equity, ESOPs, or institutional investors are on the roadmap, because share classes and transfer restrictions are better understood in that format.",
      "Tax treatment and GST registration follow the activity, not the label—so the decision should be made together with your CA and, where needed, legal counsel, using realistic projections rather than generic online templates.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
