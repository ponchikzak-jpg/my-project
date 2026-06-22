import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://revanio.com"),
  title: "Revanio — Old software, made modern",
  description:
    "Revanio rebuilds outdated business software into fast, secure, modern systems — with zero downtime and a free audit before you spend a cent.",
  openGraph: {
    title: "Revanio — Old software, made modern",
    description:
      "Outdated business software rebuilt into fast, secure, modern systems — zero downtime, free 48-hour audit.",
    url: "https://revanio.com",
    siteName: "Revanio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revanio — Old software, made modern",
    description: "Outdated business software rebuilt — zero downtime, free 48-hour audit.",
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
