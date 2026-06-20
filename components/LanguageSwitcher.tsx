"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'kh' ? 'en' : 'kh';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="rounded-full text-xl hover:bg-primary/10 transition-colors" 
      onClick={toggleLanguage}
    >
      {locale === 'kh' ? '🇰🇭' : '🇺🇸'}
      <span className="sr-only">Toggle language</span>
    </Button>
  );
}
