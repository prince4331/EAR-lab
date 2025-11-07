import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "EAR Lab | Embedded, Autonomous & Robotics Research",
  description: "Leading research laboratory specializing in embedded systems, autonomous vehicles, and robotics. Expert consultation, cutting-edge projects, and innovative solutions.",
  keywords: ["robotics", "embedded systems", "autonomous vehicles", "AI", "machine learning", "research", "innovation", "technology", "automation", "IoT"],
  authors: [{ name: "EAR Lab Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "EAR Lab | Embedded, Autonomous & Robotics Research",
    description: "Leading research laboratory specializing in embedded systems, autonomous vehicles, and robotics.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "EAR Lab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EAR Lab | Embedded, Autonomous & Robotics Research",
    description: "Leading research laboratory specializing in embedded systems, autonomous vehicles, and robotics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
