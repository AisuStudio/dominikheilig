import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dominik Heilig — Product Manager",
  description:
    "Product Manager who designs and builds, and helps teams through the gaps. Based in Berlin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
      style={
        {
          "--font-geist-pixel": "var(--font-geist-pixel-square)",
        } as React.CSSProperties
      }
    >
      <body>{children}</body>
    </html>
  );
}
