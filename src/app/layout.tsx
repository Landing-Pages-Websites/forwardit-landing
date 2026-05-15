import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { QueryParamPersistence } from "@/components/QueryParamPersistence";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

// Tracking IDs sourced from production HTML 2026-05-14.
// Preserved byte-identical per AGENTS.md edits-lane Hard Rule #1-3.
// GTM keeps the "GTM-" prefix — Google's gtm.js loader requires it.
const SITE_ID = "829c7db4-563f-44b0-9ef8-a0a921bdf8ce";
const SITE_KEY = "sk_mobm6xnk_9tv3mn0rxin";
const GTM_ID = "GTM-MW6FBPG7";
const META_PIXEL_ID = "2080354699192537";

export const metadata: Metadata = {
  metadataBase: new URL("https://solutions.theforwardit.com"),
  title: {
    default: "Free Up 40-60% of Your Team's Time | The ForwardIT | AI & Automation for SMBs",
    template: "%s | The ForwardIT",
  },
  description:
    "The ForwardIT brings 20+ years of federal AI & automation expertise to small businesses. Free up 40-60% of your team's time. Law firms, medical practices, accounting firms — see your ROI. Book a free strategy call.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <head>
        {/* MegaTag — siteId + endpoints + meta tag required for form_submit events */}
        <meta name="mega-site-id" content={SITE_ID} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"${SITE_KEY}",siteId:"${SITE_ID}",gtmId:"${GTM_ID}",pixelId:"${META_PIXEL_ID}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`,
          }}
        />
        <script
          id="optimizer-script"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id={SITE_ID}
          async
        />
        {/* GTM container — customer-specific (preserved from production layout) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-surface)] text-[var(--color-ink)]">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <QueryParamPersistence />
        {children}
      </body>
    </html>
  );
}
