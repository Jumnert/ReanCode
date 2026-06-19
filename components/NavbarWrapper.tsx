"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
 const pathname = usePathname();

 // Hide navbar on auth pages
 const hideNavbar =
 pathname === "/login" ||
 pathname === "/signup" ||
 pathname === "/forgot-password" ||
 pathname === "/verify-otp";

 if (hideNavbar) {
 return null;
 }

 return <Navbar />;
}
