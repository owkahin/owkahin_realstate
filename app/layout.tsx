import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Owkahin Real Estate",
  description: "Premium real estate marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-muted/30 text-foreground min-h-screen flex justify-center" suppressHydrationWarning>
        <div className="w-full min-h-screen bg-background flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
