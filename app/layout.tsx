import type { Metadata } from "next";
import "./globals.css";
import Header from "./header";
import Footer from "./footer";

export const metadata: Metadata = {
  title: "SportTechies",
  description: "The infrastructure layer for modern sports.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
