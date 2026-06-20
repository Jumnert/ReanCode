"use client"

import * as React from "react"
import Link from "next/link"
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSession, signOut } from "@/lib/auth-client"
import { SettingsModal, MUSIC_TRACKS, Track } from "@/components/SettingsModal"
import { Code2, LogOut, Settings as SettingsIcon, User, UserPlus, LogIn, Menu, X, Music } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { useTheme } from "next-themes"
import { Activity } from "lucide-react"
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
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsMusicPlaying(true)
            })
            .catch(() => {
              // Silently ignore if still blocked
            })
        }
      }
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }

    if (audioRef.current) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMusicPlaying(true)
          })
          .catch(() => {
            // Autoplay blocked, wait for first interaction
            document.addEventListener("click", handleFirstInteraction)
            document.addEventListener("keydown", handleFirstInteraction)
            document.addEventListener("touchstart", handleFirstInteraction)
          })
      }
    }

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }
  }, [])

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
 { href: "/exercises", label: t('exercises') },
 { href: "/roadmaps", label: t('roadmaps') },
 { href: "/leaderboard", label: t('leaderboard') },
 { href: "/books", label: t('books') },
 ]

 return (
 <header className="sticky top-0 z-50 w-full border-b-2 border-primary/20 bg-background/80 backdrop-blur-md">
 <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 md:px-6">
 {/* Brand Logo */}
 <div className="flex items-center gap-6">
 <Link href="/" className="flex items-center gap-2 font-bold text-lg md:text-xl tracking-tight text-foreground transition-opacity hover:opacity-90">
 <Code2 className="h-6 w-6 text-primary" />
 <span style={{ fontFamily: "var(--font-kantumruy-pro)" }}>រៀន២កូដ</span>
 </Link>

 {/* Desktop Navigation Menu */}
 <NavigationMenu className="hidden md:flex">
 <NavigationMenuList className="gap-1">
 {navLinks.map((link) => (
 <NavigationMenuItem key={link.href}>
 <NavigationMenuLink asChild>
 <Link
 href={link.href}
 className={cn(
 navigationMenuTriggerStyle(),
 "bg-transparent text-muted-foreground hover:text-foreground font-medium text-base transition-colors cursor-pointer",
 pathname.startsWith(link.href) && "text-primary font-semibold bg-primary/5"
 )}
 >
 {link.label}
 </Link>
 </NavigationMenuLink>
 </NavigationMenuItem>
 ))}
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
    <SettingsModal 
      isAuthenticated={isAuthenticated}
      currentTrack={currentTrack}
      setCurrentTrack={setCurrentTrack}
      isMusicPlaying={isMusicPlaying}
      toggleMusicPlay={toggleMusicPlay}
    >
      <button className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        <SettingsIcon className="h-5 w-5" />
      </button>
    </SettingsModal>
    
    <Link href="/profile">
      <Avatar className="h-9 w-9 border border-border/80 transition-transform hover:scale-105 cursor-pointer shadow-sm">
        {user.image && (
          <AvatarImage src={user.image} alt={user.name ?? "User"} referrerPolicy="no-referrer" />
        )}
        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
          {user.name?.charAt(0).toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>
    </Link>
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
 <Button variant="outline" size="sm" onClick={() => { setIsOpen(false); router.push("/settings") }} className="w-full justify-start mt-2 hidden">
 <SettingsIcon className="size-4 mr-2" />
 {t('settings')}
 </Button>
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
