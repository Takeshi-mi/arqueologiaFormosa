import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/analytics";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    template: "%s | Arqueologia Formosa",
    default: "Arqueologia Formosa - Pesquisa Arqueológica em Formosa, Goiás",
  },
  description: "Portal de pesquisa arqueológica em Formosa, Goiás. Explore sítios arqueológicos, trabalhos acadêmicos e descobertas na região.",
  keywords: ["arqueologia", "Formosa", "Goiás", "sítios arqueológicos", "pesquisa arqueológica", "patrimônio cultural"],
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
    siteName: "Arqueologia Formosa",
    description: "Portal de pesquisa arqueológica em Formosa, Goiás. Explore sítios arqueológicos, trabalhos acadêmicos e descobertas na região.",
  },
  robots: !isProduction ? "noindex, nofollow" : "index, follow",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased overscroll-none",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
        <Toaster position="top-center" richColors />
        {isProduction && <Analytics />}
        {isProduction && GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
