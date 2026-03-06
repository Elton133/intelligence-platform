import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infrastructure Intelligence Platform",
  description: "Track infrastructure projects across Africa and beyond. One platform, every project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
