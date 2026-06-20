import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'kh'],
  defaultLocale: 'kh'
});
 
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
