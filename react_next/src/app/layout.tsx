import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSSRStyles } from "builder-css";
import BuilderCSSProvider from "../components/BuilderCSSProvider";
import "../lib/builder-css-init";
// Import all dynamic route styles to ensure SSR collection
import "../styles/book-detail-styles";

// animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookstore Manager - Builder CSS Demo",
  description: "Next.js App Router with Builder CSS SSR Demo",
};

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get SSR styles from builder-css
  const ssrStyles = getSSRStyles();

  return (
    <html lang="en">
      <head>
        {ssrStyles && (
          <style
            id="builder-css-ssr"
            dangerouslySetInnerHTML={{ __html: ssrStyles }}
          />
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BuilderCSSProvider>{children}</BuilderCSSProvider>
      </body>
    </html>
  );
}
