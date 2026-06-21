"use client"

import * as React from "react"
import Link from "next/link"
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSession, signOut } from "@/lib/auth-client"
import { SettingsModal, MUSIC_TRACKS, Track } from "@/components/SettingsModal"
import { ProgressModal } from "@/components/ProgressModal"
import { Code2, LogOut, Settings as SettingsIcon, User, UserPlus, LogIn, Menu, X, Music } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { useTheme } from "next-themes"
import { Activity, Dumbbell, Map, Trophy, BookOpen, Layers } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LanguageSwitcher } from "./LanguageSwitcher"
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export default function Navbar() {
 const pathname = usePathname()
 const router = useRouter()
 const { data: session } = useSession()
 const { resolvedTheme, setTheme } = useTheme()
 const [mounted, setMounted] = React.useState(false)
 const [isOpen, setIsOpen] = React.useState(false)
 const t = useTranslations('Navbar')
 
 React.useEffect(() => {
   // eslint-disable-next-line react-hooks/set-state-in-effect
   setMounted(true)
 }, [])
 
 // Audio Logic
 const [isMusicPlaying, setIsMusicPlaying] = React.useState(false)
 const [currentTrack, setCurrentTrack] = React.useState<Track>(MUSIC_TRACKS[0])
 const audioRef = React.useRef<HTMLAudioElement | null>(null)

 React.useEffect(() => {
   if (!audioRef.current) {
     audioRef.current = new Audio(currentTrack.file)
     audioRef.current.loop = true
     audioRef.current.volume = 0.5
   } else {
     audioRef.current.src = currentTrack.file
   }
   
   if (isMusicPlaying) {
     audioRef.current.play().catch(() => {})
   }
 }, [currentTrack])



 React.useEffect(() => {
   return () => {
     if (audioRef.current) {
       audioRef.current.pause()
     }
   }
 }, [])

 const toggleMusicPlay = (e?: React.MouseEvent) => {
   e?.preventDefault()
   e?.stopPropagation()
   if (!audioRef.current) return
   
   if (audioRef.current.paused) {
     audioRef.current.play().catch(e => console.error("Audio playback failed:", e))
     setIsMusicPlaying(true)
   } else {
     audioRef.current.pause()
     setIsMusicPlaying(false)
   }
 }

 const isAuthenticated = !!session?.user
 const user = session?.user

 const handleLogout = async () => {
   await signOut()
   router.push('/')
 }

  const navLinks = [
  { href: "/exercises", label: t('exercises'), icon: Dumbbell },
  { href: "/roadmaps", label: t('roadmaps'), icon: Map },
  { href: "/leaderboard", label: t('leaderboard'), icon: Trophy },
  { href: "/books", label: t('books'), icon: BookOpen },
  ]

  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
  <header className={cn(
    "sticky top-0 z-50 w-full transition-all duration-300",
    isScrolled ? "pt-4 bg-transparent pointer-events-none" : "border-b border-primary/20 bg-background/40 backdrop-blur-xl"
  )}>
  <div className={cn(
    "mx-auto h-14 flex items-center justify-between px-4 md:px-6 relative transition-all duration-300",
    isScrolled ? "max-w-[1440px] md:max-w-5xl xl:max-w-[1400px] rounded-full bg-background/40 backdrop-blur-xl shadow-lg border border-primary/20 pointer-events-auto" : "max-w-[1440px]"
  )}>
 {/* Brand Logo */}
 <div className="flex items-center gap-6">
 <Link href="/" className="flex items-center gap-2 font-bold text-lg md:text-xl tracking-tight text-foreground transition-opacity hover:opacity-90">
 <Code2 className="h-6 w-6 text-primary" />
 <span style={{ fontFamily: "var(--font-kantumruy-pro)" }}>រៀន២កូដ</span>
 </Link>
 </div>

  {/* Desktop Navigation Menu */}
  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
  <NavigationMenu>
  <NavigationMenuList className="gap-1">
   {navLinks.map((link) => {
   const Icon = link.icon;
   return (
   <NavigationMenuItem key={link.href}>
   <NavigationMenuLink asChild>
   <Link
   href={link.href}
   className={cn(
   navigationMenuTriggerStyle(),
   "bg-transparent text-muted-foreground hover:text-foreground font-medium text-base transition-colors cursor-pointer flex items-center gap-2",
   pathname.startsWith(link.href) && "text-primary font-semibold bg-primary/5"
   )}
   >
   <Icon className="h-4 w-4 text-primary" />
   <span className="hidden xl:inline">{link.label}</span>
   </Link>
   </NavigationMenuLink>
   </NavigationMenuItem>
   )
   })}
  </NavigationMenuList>
  </NavigationMenu>

  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger className={cn("bg-transparent text-muted-foreground hover:text-foreground font-medium text-base transition-colors gap-2", pathname.startsWith("/resources") && "text-primary font-semibold bg-primary/5")}>
          <Layers className="h-4 w-4 text-primary" />
          <span className="hidden xl:inline">Resources</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">

            <li>
              <NavigationMenuLink asChild>
                <Link href="/resources/react" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">React UI Libraries</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">shadcn/ui, HeroUI, Radix, and more...</p>
                </Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link href="/resources/mcp" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">MCP Servers</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">Integrations for PostgreSQL, GitHub...</p>
                </Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link href="/resources/agents" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Agent Skills</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">Advanced instructions for AI agents.</p>
                </Link>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
  </div>

 {/* Right Actions */}
 <div className="flex items-center gap-3">
 <LanguageSwitcher />
 {mounted ? (
   <AnimatedThemeToggler 
      variant="circle" 
      duration={700}
      theme={resolvedTheme as "light" | "dark"} 
      onThemeChange={setTheme} 
    />
 ) : (
   <div className="w-9 h-9" />
 )}

 {/* Desktop Authentication controls */}
 <div className="hidden md:flex items-center gap-3">
 {isAuthenticated && user ? (
  <div className="flex items-center gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 border border-border/80 transition-transform hover:scale-105 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          {user.image && (
            <AvatarImage src={user.image} alt={user.name ?? "User"} referrerPolicy="no-referrer" />
          )}
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {user.name?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>{t('profile')}</span>
        </DropdownMenuItem>
        
        <ProgressModal>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
            <Activity className="mr-2 h-4 w-4" />
            <span>{t('myProgress', { fallback: 'My Progress' })}</span>
          </DropdownMenuItem>
        </ProgressModal>

        <SettingsModal 
          isAuthenticated={isAuthenticated}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          isMusicPlaying={isMusicPlaying}
          toggleMusicPlay={toggleMusicPlay}
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>{t('settings')}</span>
          </DropdownMenuItem>
        </SettingsModal>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
 ) : (
 <>
 <Link href="/login">
 <Button variant="outline" size="sm" className="text-sm font-medium border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-full px-4">
 <LogIn className="size-4 mr-1.5" />
 {t('login')}
 </Button>
 </Link>
 <Link href="/signup">
 <Button size="sm" className="bg-primary hover:bg-primary text-white rounded-full font-medium px-4">
 <UserPlus className="size-4 mr-1.5" />
 {t('getStarted')}
 </Button>
 </Link>
 </>
 )}
 </div>

 {/* Mobile Sheet Trigger */}
 <Sheet open={isOpen} onOpenChange={setIsOpen}>
 <SheetTrigger asChild>
 <Button variant="ghost" size="icon" className="md:hidden">
 <Menu className="h-5 w-5" />
 <span className="sr-only">Toggle menu</span>
 </Button>
 </SheetTrigger>
 <SheetContent side="right" className="w-72 flex flex-col justify-between">
 <div>
 <SheetHeader className="text-left pb-4 border-b">
 <SheetTitle className="flex items-center gap-2">
 <Code2 className="h-5 w-5 text-primary" />
 <span style={{ fontFamily: "var(--font-kantumruy-pro)" }}>រៀន២កូដ</span>
 </SheetTitle>
 </SheetHeader>
 <nav className="flex flex-col gap-4 mt-6">
 {navLinks.map((link) => (
 <Link
 key={link.href}
 href={link.href}
 onClick={() => setIsOpen(false)}
 className={cn(
 "text-base font-medium text-muted-foreground transition-colors py-1.5 hover:text-foreground",
 pathname.startsWith(link.href) && "text-primary font-semibold"
 )}
 >
 {link.label}
 </Link>
 ))}
 </nav>
 </div>

 <div className="border-t pt-4 flex flex-col gap-3">
 {isAuthenticated && user ? (
 <>
 <div className="flex items-center gap-3 px-1 mb-2">
 <Avatar className="h-10 w-10 border">
 {user.image && (
 <AvatarImage src={user.image} alt={user.name ?? "User"} referrerPolicy="no-referrer" />
 )}
 <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
 {user.name?.charAt(0).toUpperCase() ?? "U"}
 </AvatarFallback>
 </Avatar>
 <div className="flex flex-col">
 <span className="font-semibold text-sm">{user.name}</span>
 <span className="text-xs text-muted-foreground">{user.email}</span>
 </div>
 </div>
 <Button variant="outline" size="sm" onClick={() => { setIsOpen(false); router.push("/profile") }} className="w-full justify-start">
 <User className="size-4 mr-2" />
 {t('profile')}
 </Button>
 <ProgressModal>
   <Button variant="outline" size="sm" onClick={() => { setIsOpen(false) }} className="w-full justify-start mt-2">
   <Activity className="size-4 mr-2" />
   {t('myProgress', { fallback: 'My Progress' })}
   </Button>
 </ProgressModal>
 
 <SettingsModal 
   isAuthenticated={isAuthenticated}
   currentTrack={currentTrack}
   setCurrentTrack={setCurrentTrack}
   isMusicPlaying={isMusicPlaying}
   toggleMusicPlay={toggleMusicPlay}
 >
   <Button variant="outline" size="sm" onClick={() => { setIsOpen(false) }} className="w-full justify-start mt-2">
   <SettingsIcon className="size-4 mr-2" />
   {t('settings')}
   </Button>
 </SettingsModal>

 <Button variant="destructive" size="sm" onClick={() => { setIsOpen(false); handleLogout() }} className="w-full justify-start mt-2">
 <LogOut className="size-4 mr-2" />
 {t('logout')}
 </Button>
 </>
 ) : (
 <>
 <Link href="/login" onClick={() => setIsOpen(false)}>
 <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-full">
 <LogIn className="size-4 mr-1.5" />
 {t('login')}
 </Button>
 </Link>
 <Link href="/signup" onClick={() => setIsOpen(false)}>
 <Button size="sm" className="w-full bg-primary hover:bg-primary text-white rounded-full">
 <UserPlus className="size-4 mr-1.5" />
 {t('getStarted')}
 </Button>
 </Link>
 </>
 )}
 </div>
 </SheetContent>
 </Sheet>
 </div>
 </div>
 </header>
 )
}
