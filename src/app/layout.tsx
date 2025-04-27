import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Provider from "./provider";
import "./globals.css";
import { Toaster } from "sonner";

import { ClerkProvider } from "@clerk/nextjs";

//Server-side file

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LogoFlowy",
  description: "Generate a custom logo for your brand",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Provider>{children}</Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
