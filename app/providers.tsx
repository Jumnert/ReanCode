"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { HapticsSoundProvider } from "@/hooks/sound/haptics-sound-provider";

export function Providers({ children }: { children: React.ReactNode }) {
 return (
 <SessionProvider>
 <NextThemesProvider
 attribute="class"
 defaultTheme="system"
 enableSystem
 disableTransitionOnChange
 >
 <HapticsSoundProvider>
 {children}
 </HapticsSoundProvider>
 </NextThemesProvider>
 </SessionProvider>
 );
}
