"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "@/lib/auth-client"
import { Code2, LogOut, Settings, User, UserPlus, LogIn, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ThemeSwitcher } from "@/components/theme-switcher"
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
 NavigationMenuItem,
 NavigationMenuLink,
 NavigationMenuList,
 navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export default function Navbar() {
 const router = useRouter()
 const pathname = usePathname()
 const { data: session } = useSession()
 const isAuthenticated = !!session?.user
 const user = session?.user
 const [isOpen, setIsOpen] = React.useState(false)

 const handleLogout = async () => {
 await signOut()
 router.push("/")
 }

 const navLinks = [
 { href: "/learn", label: "មេរៀន" },
 { href: "/books", label: "សៀវភៅ" },
 { href: "/exercises", label: "លំហាត់" },
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
 "bg-transparent text-muted-foreground hover:text-foreground font-medium text-sm transition-colors cursor-pointer",
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
 <ThemeSwitcher />

 {/* Desktop Authentication controls */}
 <div className="hidden md:flex items-center gap-3">
 {isAuthenticated && user ? (
  <Link href="/profile">
    <Avatar className="h-9 w-9 border border-border/80 transition-transform hover:scale-105 cursor-pointer shadow-sm">
      {user.image && (
        <AvatarImage src={user.image} alt={user.name ?? "User"} />
      )}
      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
        {user.name?.charAt(0).toUpperCase() ?? "U"}
      </AvatarFallback>
    </Avatar>
  </Link>
 ) : (
 <>
 <Link href="/login">
 <Button variant="outline" size="sm" className="text-sm font-medium border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-full px-4">
 <LogIn className="size-4 mr-1.5" />
 ចូលគណនី
 </Button>
 </Link>
 <Link href="/signup">
 <Button size="sm" className="bg-primary hover:bg-primary text-white rounded-full font-medium px-4">
 <UserPlus className="size-4 mr-1.5" />
 ចាប់ផ្តើម
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
 <AvatarImage src={user.image} alt={user.name ?? "User"} />
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
 ប្រវត្តិរូប
 </Button>
 <Button variant="outline" size="sm" onClick={() => { setIsOpen(false); router.push("/settings") }} className="w-full justify-start">
 <Settings className="size-4 mr-2" />
 ការកំណត់
 </Button>
 <Button variant="destructive" size="sm" onClick={() => { setIsOpen(false); handleLogout() }} className="w-full justify-start mt-2">
 <LogOut className="size-4 mr-2" />
 ចាកចេញ
 </Button>
 </>
 ) : (
 <>
 <Link href="/login" onClick={() => setIsOpen(false)}>
 <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-full">
 <LogIn className="size-4 mr-1.5" />
 ចូលគណនី
 </Button>
 </Link>
 <Link href="/signup" onClick={() => setIsOpen(false)}>
 <Button size="sm" className="w-full bg-primary hover:bg-primary text-white rounded-full">
 <UserPlus className="size-4 mr-1.5" />
 ចាប់ផ្តើម
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
