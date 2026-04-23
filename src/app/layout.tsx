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

export const metadata: Metadata = {
  metadataBase: new URL("https://solutions.theforwardit.com"),
  title: {
    default: "ForwardIT — AI & Automation for SMBs | Reclaim 40-60% of Team Time",
    template: "%s | ForwardIT",
  },
  description:
    "Federal-grade AI & automation, built for SMBs. Free up 40-60% of your team's time with a 30-minute ROI assessment. 20+ years of experience — NIH, SAMHSA, federal agencies.",
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
        {/* MegaTag — matches working repower-landing + triarc setup (siteId + endpoints + meta tag required for form_submit events) */}
        <meta name="mega-site-id" content="__SITE_ID__" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"__SITE_KEY__",siteId:"__SITE_ID__",gtmId:"__GTM_ID__",pixelId:"__META_PIXEL_ID__"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`,
          }}
        />
        <script
          id="optimizer-script"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id="__SITE_ID__"
          async
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-surface)] text-[var(--color-ink)]">
        <QueryParamPersistence />
        {children}
      </body>
    </html>
  );
}
