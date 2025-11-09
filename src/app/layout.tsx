import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/logo.png", sizes: "180x180" }],
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
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
