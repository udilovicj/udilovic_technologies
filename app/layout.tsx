import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "Creative developer portfolio showcasing modern web applications built with clean code and thoughtful design.",
  keywords: ["portfolio", "web developer", "frontend", "designer", "creative developer", "ui/ux"],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" />
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden bg-[#0a0a0a]`} suppressHydrationWarning>
        <div className="transition-opacity duration-500">
          {children}
        </div>
      </body>
    </html>
  );
}
