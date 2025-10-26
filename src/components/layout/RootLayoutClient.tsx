"use client";

import { Navbar } from "./Navbar";
import { usePathname } from "next/navigation";

interface RootLayoutClientProps {
  children: React.ReactNode;
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

export function RootLayoutClient({ children, user }: RootLayoutClientProps) {
  const pathname = usePathname();
  
  // Páginas que NO deben mostrar el navbar
  const hideNavbarPaths = ["/"];
  const shouldHideNavbar = hideNavbarPaths.includes(pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar user={user} />}
      {children}
    </>
  );
}
