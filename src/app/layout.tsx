import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PostPilot | AI-Powered Social Media Management",
  description: "Schedule, automate, and grow your social presence with AI-driven insights across all platforms.",
  keywords: ["social media management", "AI captions", "auto-reply", "content scheduling", "social media automation"],
  authors: [{ name: "PostPilot Team" }],
  openGraph: {
    title: "PostPilot | AI-Powered Social Media Management",
    description: "Schedule, automate, and grow your social presence with AI-driven insights.",
    url: "https://postpilot.com",
    siteName: "PostPilot",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PostPilot | AI-Powered Social Media Management",
    description: "The only AI copilot you need to grow your social audience while you sleep.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${outfit.className} antialiased min-h-screen bg-background`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
