"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import {
  Button,
  Input,
  Avatar,
  Dropdown,
  Label,
} from "@heroui/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import {
  BookOpen,
  Code2,
  Trophy,
  User,
  LogOut,
  Settings,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">

            {/* Left — Logo & Nav */}
            <div className="flex items-center gap-6">
              <Link href="/" className="group relative text-2xl font-bold tracking-tighter">
                <span className="text-foreground transition-colors">
                  រៀន<span className="text-primary">២</span>កូដ
                </span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>

              <div className="hidden lg:flex items-center gap-1 text-sm">
                <Link href="/learn">
                  <Button variant="ghost" size="sm" className="font-semibold">
                    <Code2 className="size-4" />
                    មេរៀន
                  </Button>
                </Link>
                <Link href="/books">
                  <Button variant="ghost" size="sm" className="font-semibold">
                    <BookOpen className="size-4" />
                    សៀវភៅ
                  </Button>
                </Link>
                <Link href="/exercises">
                  <Button variant="ghost" size="sm" className="font-semibold">
                    <Trophy className="size-4" />
                    លំហាត់
                  </Button>
                </Link>
              </div>
            </div>

            {/* Center — Search */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative hidden sm:block">
                <Input type="search" placeholder="ស្វែងរករហ័ស..." className="w-64 lg:w-80 text-sm" />
              </div>
            </div>

            {/* Right — Auth & Theme */}
            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                <Dropdown>
                  <Dropdown.Trigger
                    className="rounded-full ring-2 ring-primary/50 hover:ring-primary transition-all hover:scale-110 focus:outline-none"
                    aria-label="User menu"
                  >
                    <Avatar className="size-8 cursor-pointer">
                      {user.image && (
                        <Avatar.Image
                          src={user.image}
                          alt={user.name ?? "User"}
                        />
                      )}
                      <Avatar.Fallback>
                        {user.name?.charAt(0).toUpperCase() ?? "U"}
                      </Avatar.Fallback>
                    </Avatar>
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <Dropdown.Menu onAction={(key) => {
                      if (key === "logout") handleLogout();
                      if (key === "profile") router.push("/profile");
                      if (key === "settings") router.push("/settings");
                    }}>
                      <Dropdown.Item id="profile" textValue="ប្រវត្តិរូប">
                        <span className="flex items-center gap-2">
                          <User className="size-4" />
                          <Label>ប្រវត្តិរូប</Label>
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item id="settings" textValue="ការកំណត់">
                        <span className="flex items-center gap-2">
                          <Settings className="size-4" />
                          <Label>ការកំណត់</Label>
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item id="logout" textValue="ចាកចេញ" variant="danger">
                        <span className="flex items-center gap-2">
                          <LogOut className="size-4" />
                          <Label>ចាកចេញ</Label>
                        </span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="md"
                      className="font-semibold border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5">
                      <LogIn className="size-4" />
                      ចូល
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary" size="md"
                      className="font-semibold bg-blue-600 hover:bg-blue-700 text-white">
                      <UserPlus className="size-4" />
                      ចាប់ផ្តើម
                    </Button>
                  </Link>
                </>
              )}

              <ThemeSwitcher />
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}
