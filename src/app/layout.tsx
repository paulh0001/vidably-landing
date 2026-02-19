import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vidably — Verified Buyer Videos for E-Commerce",
  description:
    "Vidably turns verified buyer videos into structured evidence that drives conversion. Real people, real products, measured impact.",
  metadataBase: new URL("https://www.vidably.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Vidably — Verified Buyer Videos for E-Commerce",
    description:
      "Turn verified buyer videos into structured evidence that drives conversion.",
    url: "/",
    siteName: "Vidably",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidably — Verified Buyer Videos for E-Commerce",
    description:
      "Turn verified buyer videos into structured evidence that drives conversion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </html>
  );
}
