import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
// import Navbar from "@/components/Navbar";
import StyledJsxRegistry from "./registry";

export const metadata: Metadata = {
  title: "ClennAI | AI Systems for Businesses",
  description:
    "ClennAI helps businesses automate lead generation, outreach, and sales pipelines using AI-powered systems.",

  openGraph: {
    title: "ClennAI | AI for Businesses",
    description:
      "ClennAI helps businesses automate lead generation, outreach, and sales pipelines using AI-powered systems.",
    images: "/opengraph-image.png",
    type: "website",
    url: "https://clennai.com"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        <StyledJsxRegistry>{children}</StyledJsxRegistry>

        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="489b5533-d441-4ee2-aa9f-fca980976615"
        />
      </body>
    </html>
  );
}