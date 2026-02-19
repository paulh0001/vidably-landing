import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Vidably",
  description: "How Vidably collects, uses, and protects information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-default text-text-primary">
      <main className="page-container py-16 max-sm:py-10">
        <article className="mx-auto max-w-[720px] font-body text-text-secondary leading-relaxed">
          <h1 className="font-heading text-[34px] font-bold tracking-tight text-text-primary mb-8 max-sm:text-[26px]">
            Privacy Policy
          </h1>

          <p className="mb-6">
            Vidably Inc. (&ldquo;Vidably,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) provides video
            widgets for e-commerce product pages. This policy describes how information is collected,
            used, and protected through our website and Shopify application.
          </p>

          <h2 className="font-heading text-xl font-semibold text-text-primary mt-10 mb-4">
            For Merchants
          </h2>
          <p className="mb-4">When installing the Vidably app, we collect:</p>
          <ul className="mb-6 list-disc pl-6 space-y-1">
            <li>Store domain and Shopify access credentials</li>
            <li>Product catalog information (to associate videos with products)</li>
            <li>Contact information you provide</li>
          </ul>
          <p className="mb-6">
            We use this data to operate, provide support, and improve the product. We do not sell
            merchant data.
          </p>

          <h2 className="font-heading text-xl font-semibold text-text-primary mt-10 mb-4">
            For Shoppers
          </h2>
          <p className="mb-4">When interacting with a Vidably widget on a store, we collect:</p>
          <ul className="mb-6 list-disc pl-6 space-y-1">
            <li>An anonymous identifier (random ID stored in a cookie)</li>
            <li>Widget interactions (video plays, navigation)</li>
            <li>Purchase attribution (product IDs and order value, not personal details)</li>
            <li>Device type and page URL</li>
          </ul>
          <p className="mb-6">
            We do not collect your name, email, phone number, address, payment information, or any
            personally identifiable information. All tracking is anonymous.
          </p>

          <h2 className="font-heading text-xl font-semibold text-text-primary mt-10 mb-4">
            Cookies &amp; Storage
          </h2>
          <ul className="mb-6 list-disc pl-6 space-y-1">
            <li>
              <code className="text-sm">vidably_user_id</code> — Anonymous identifier (365 days)
            </li>
            <li>
              <code className="text-sm">vidably_visit_id</code> — Session identifier (cleared when
              you close the tab)
            </li>
            <li>A/B test assignment cookies to measure widget effectiveness</li>
          </ul>

          <h2 className="font-heading text-xl font-semibold text-text-primary mt-10 mb-4">
            Service Providers
          </h2>
          <ul className="mb-6 list-disc pl-6 space-y-1">
            <li><strong>Mux</strong> — Video hosting and streaming</li>
            <li><strong>PostHog</strong> — Anonymous product analytics</li>
            <li><strong>Sentry</strong> — Error monitoring</li>
            <li><strong>Railway</strong> — Infrastructure hosting</li>
          </ul>

          <h2 className="font-heading text-xl font-semibold text-text-primary mt-10 mb-4">
            Data Retention
          </h2>
          <p className="mb-6">
            Merchant data is deleted within 48 hours of app uninstallation. Anonymous analytics data
            is retained for up to 12 months.
          </p>

          <h2 className="font-heading text-xl font-semibold text-text-primary mt-10 mb-4">
            Your Rights
          </h2>
          <p className="mb-6">
            You may have jurisdiction-dependent rights to access, correct, delete, or port your data.
            Merchants can request deletion by uninstalling the app or contacting support. Shoppers
            can clear cookies through browser settings.
          </p>

          <h2 className="font-heading text-xl font-semibold text-text-primary mt-10 mb-4">
            Security
          </h2>
          <p className="mb-6">
            We use industry-standard security measures including encryption in transit, secure
            credential storage, and access controls.
          </p>

          <h2 className="font-heading text-xl font-semibold text-text-primary mt-10 mb-4">
            Changes to This Policy
          </h2>
          <p className="mb-6">
            Material changes will be communicated to merchants via email or in-app notice. Continued
            use constitutes acceptance.
          </p>

          <h2 className="font-heading text-xl font-semibold text-text-primary mt-10 mb-4">
            Limitation of Liability
          </h2>
          <p className="mb-6">
            Vidably is not liable for indirect, incidental, or consequential damages from service use
            or data processing under this policy.
          </p>

          <h2 className="font-heading text-xl font-semibold text-text-primary mt-10 mb-4">
            Contact
          </h2>
          <p className="mb-6">
            For privacy questions:{" "}
            <a href="mailto:privacy@vidably.com" className="text-text-primary underline hover:no-underline">
              privacy@vidably.com
            </a>
          </p>

          <p className="text-sm text-text-muted mt-10">Last updated: February 2026</p>
        </article>
      </main>
    </div>
  );
}
