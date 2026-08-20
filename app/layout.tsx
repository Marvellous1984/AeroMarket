import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ALLOW_INDEXING, BRAND_NAME, TAGLINE, SITE_URL } from "@/lib/config/brand";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} · ${TAGLINE}`,
    template: `%s · ${BRAND_NAME}`,
  },
  description: TAGLINE,
  robots: ALLOW_INDEXING
    ? undefined
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
      },
  openGraph: {
    siteName: BRAND_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
    </html>
  );
}
