import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SignOutButton } from "../components/sign-out-button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Dashboard - Supabase subdomain auth example",
  description:
    "Example of subdomain auth with Next.js cookie-based apex domain redirect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav>
          <SignOutButton />
        </nav>
        {children}
      </body>
    </html>
  );
}
