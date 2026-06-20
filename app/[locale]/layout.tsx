import type { Metadata } from "next";
import { Kantumruy_Pro, Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import { UsernameSetupCheck } from "@/components/username-setup-check";
import { GlobalClickSound } from "@/components/GlobalClickSound";

import { Providers } from "../providers";
import { ConsentManager } from "@/components/consent-manager";
import { cn } from "@/lib/utils";

const inter = Inter({
 subsets: ["latin"],
 variable: "--font-sans",
});

const cormorantGaramond = Cormorant_Garamond({
 subsets: ["latin"],
 weight: ["400", "500", "600", "700"],
 variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
 subsets: ["latin"],
 variable: "--font-mono",
});

const kantumruyPro = Kantumruy_Pro({
 variable: "--font-kantumruy-pro",
 subsets: ["khmer", "latin"],
 weight: ["100", "200", "300", "400", "500", "600", "700"],
 display: "swap",
});

export const metadata: Metadata = {
  title: "រៀន២កូដ - រៀនសរសេរកូដជាភាសាខ្មែរ",
  description: "រៀនសរសេរកូដជាភាសាខ្មែរ — HTML, CSS, JavaScript, Python និងច្រើនទៀត។ មានមេរៀន, លំហាត់, និងសៀវភៅឥតគិតថ្លៃ។",
  keywords: ["រៀនកូដ", "ភាសាខ្មែរ", "HTML", "CSS", "JavaScript", "Python", "programming", "Cambodia", "coding"],
  authors: [{ name: "រៀន២កូដ", url: "https://rean2code.vercel.app" }],
  metadataBase: new URL("https://rean2code.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "km_KH",
    url: "https://rean2code.vercel.app",
    siteName: "រៀន២កូដ",
    title: "រៀន២កូដ - រៀនសរសេរកូដជាភាសាខ្មែរ",
    description: "រៀនសរសេរកូដជាភាសាខ្មែរ — HTML, CSS, JavaScript, Python និងច្រើនទៀត។ មានមេរៀន, លំហាត់, និងសៀវភៅឥតគិតថ្លៃ។",
    images: [
      {
        url: "/seoimg.png",
        width: 1200,
        height: 630,
        alt: "រៀន២កូដ - វេទិកាសិក្សាសរសេរកូដជាភាសាខ្មែរ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "រៀន២កូដ - រៀនសរសេរកូដជាភាសាខ្មែរ",
    description: "រៀនសរសេរកូដជាភាសាខ្មែរ — HTML, CSS, JavaScript, Python និងច្រើនទៀត។",
    images: ["/seoimg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${cormorantGaramond.variable} ${jetbrainsMono.variable} ${kantumruyPro.variable} font-sans`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <GlobalClickSound />
            <NavbarWrapper />
            <UsernameSetupCheck />
            <main className="flex-grow">
              {children}
            </main>
            <ConsentManager />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
