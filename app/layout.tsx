import type { Metadata } from "next";
import { Kantumruy_Pro, Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";

import { Providers } from "./providers";
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
 title: "រៀន២កូដ - រៀនសរសេរកូដគ្មានព្រំប្រទល់",
 description:
 "វេទិកាសិក្សាដ៏មានឥទ្ធិពលដែលពោរពេញដោយការសរសេរកូដអន្តរកម្ម ជំនួយ AI និងការសហការពេលវេលាជាក់ស្តែង។",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html
 lang="km"
 className={cn("h-full", "antialiased", inter.variable, cormorantGaramond.variable, jetbrainsMono.variable, kantumruyPro.variable)}
 suppressHydrationWarning
 >
 <body
 className="min-h-full flex flex-col bg-background text-foreground font-sans"
 >
 <Providers>
 <NavbarWrapper />
 {children}
 </Providers>
 </body>
 </html>
 );
}
