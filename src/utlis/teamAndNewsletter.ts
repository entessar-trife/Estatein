export type ComposedEmail = { subject: string; message: string };

export const companyFooter = `
Best regards,
Estatein Real Estate Company

Headquarters:
123 Estatein Plaza, City Center
Email: info@estatein.com
Phone: 1234567890

Regional Office:
456 Urban Avenue, Downtown District, Metropolis
Email: info@estatein.com
Phone: +1 (123) 628-7890
`.trim();

const S = (v: unknown) => String(v ?? "").trim();
const bullet = (label: string, value?: string) => {
  const v = S(value);
  return v ? `• ${label}: ${v}` : "";
};
const join = (lines: string[]) => lines.filter(Boolean).join("\n");

export function composeNewsletterEmail(input: {
  subscriberEmail: string;
  siteName?: string;
  note?: string;
}): ComposedEmail {
  const email = S(input.subscriberEmail);
  const siteName = S(input.siteName) || "our website";
  const note = S(input.note);

  const subject = `New Newsletter Subscription — Action Required`;

  const salutation = `Dear Subscriber,`;

  const intro = [
    `We are pleased to inform you that a new individual has successfully subscribed to the ${siteName} newsletter.`,
    `This subscription reflects a positive signal of engagement and interest in our content, services, and updates.`,
    `To maintain the momentum and optimize subscriber retention, please review the details below and follow the recommended next steps.`,
  ].join(" ");

  const detailsHeader = `Subscriber Information:`;
  const details = join([
    bullet("Email Address", email),
    bullet("Subscription Source", siteName),
    bullet("Subscription Timestamp", new Date().toISOString()),
  ]);

  const notesSection = note
    ? join([
        `Additional Notes from Capture Form:`,
        note,
      ])
    : "";

  const objectivesHeader = `Objectives & Rationale:`;
  const objectives = [
    `• Acknowledge and welcome the subscriber promptly to establish trust.`,
    `• Deliver clear expectations on email frequency and value proposition.`,
    `• Encourage profile enrichment (preferences, interests, location) to enable better personalization.`,
    `• Guide the subscriber toward key content pillars and conversion pathways (blog, listings, guides, booking, or product pages).`,
  ].join("\n");

  const nextStepsHeader = `Recommended Next Steps (Owner: Marketing/CRM):`;
  const nextSteps = [
    `1) Add to Audience Segment:`,
    `   • Ensure the subscriber is added to the correct mailing list in your ESP/CRM.`,
    `   • Tag with source = "${siteName}", channel = "newsletter", and capture date.`,
    ``,
    `2) Trigger Welcome Sequence (within 5–15 minutes):`,
    `   • Email #1 (Welcome & Confirmation): Thank them for subscribing, summarize what to expect, and link to top resources.`,
    `   • Email #2 (Value & Orientation): Showcase best-performing content/collections, introduce brand story and mission.`,
    `   • Email #3 (Engagement & Personalization): Ask for preferences (topics, frequency), link to profile center.`,
    ``,
    `3) Profile Enrichment:`,
    `   • Invite the subscriber to set preferences (buy/sell/rent/learn, regions of interest, budget).`,
    `   • Encourage them to bookmark the content hub and follow our social channels.`,
    ``,
    `4) Compliance & Deliverability:`,
    `   • Ensure double opt-in is respected if enabled in the ESP/CRM.`,
    `   • Verify SPF/DKIM/DMARC configuration is healthy for maximum inbox placement.`,
    `   • Keep a visible unsubscribe link and a concise privacy explanation.`,
    ``,
    `5) Reporting & KPIs (Next 7–14 days):`,
    `   • Welcome sequence open rate, CTR, and subscription retention.`,
    `   • Preference center completion rate.`,
    `   • Assisted conversions (e.g., inquiries, bookings, saved listings, or downloads).`,
  ].join("\n");

  const contentHeader = `Suggested Content Highlights for the Welcome Series:`;
  const contentIdeas = [
    `• Start Here: A short orientation guide to navigate ${siteName}.`,
    `• Most-Read Articles: Curated insights (market trends, area guides, buying/selling checklists).`,
    `• Featured Collections: Popular properties, investment picks, seasonal recommendations.`,
    `• Tools & Calculators: Mortgage calculator, affordability estimator, market comparison.`,
    `• Community & Trust: Awards, client stories, testimonials, and our service standards.`,
  ].join("\n");

  const cadenceHeader = `Cadence & Tone:`;
  const cadence = [
    `• Cadence: Start with a 3-email welcome sequence over 7–10 days, then transition to your regular newsletter cycle.`,
    `• Tone: Professional, helpful, and concise; avoid jargon and keep CTAs clear and singular.`,
    `• Accessibility: Use clear headings, adequate contrast, alt text for images, and mobile-first layouts.`,
  ].join("\n");

  const complianceHeader = `Compliance, Consent & Data Minimization:`;
  const compliance = [
    `• Ensure we only store data essential for delivery and personalization, in accordance with applicable regulations.`,
    `• Maintain transparent consent language and offer easy unsubscribe and preference management.`,
    `• Regularly audit suppression lists and respect do-not-contact flags.`,
  ].join("\n");

  const supportHeader = `Operational Notes & Support:`;
  const support = [
    `• If you notice deliverability issues, validate DNS records and throttling settings.`,
    `• For template changes, follow the design system guidelines to maintain consistency.`,
    `• Coordinate with content and product teams for timely inclusions (new listings, events, releases).`,
  ].join("\n");

  const closing = [
    `Thank you for taking swift action to welcome and engage our new subscriber.`,
    `Please reach out to Marketing Ops or CRM Admin if you need adjustments to the workflow or templates.`,
    ``,
    companyFooter,
  ].join("\n");

  const body = join([
    salutation,
    "",
    intro,
    "",
    detailsHeader,
    details,
    notesSection ? `\n${notesSection}\n` : "",
    objectivesHeader,
    objectives,
    "",
    nextStepsHeader,
    nextSteps,
    "",
    contentHeader,
    contentIdeas,
    "",
    cadenceHeader,
    cadence,
    "",
    complianceHeader,
    compliance,
    "",
    supportHeader,
    support,
    "",
    closing,
  ]);

  return { subject, message: body };
}