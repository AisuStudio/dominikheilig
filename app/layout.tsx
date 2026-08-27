import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Dominik Heilig — Product Manager",
  description:
    "Design-led Product Manager and agentic builder with 15+ years in tech, based in Berlin. Available for freelance work, permanent roles and collaborations.",
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
