"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

interface NavbarProps {
  showAuthButtons?: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

export function Navbar({ showAuthButtons = true, user }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all">
              Talento Local
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {/* Link a API Docs siempre visible */}
            <Link
              href="/api-docs"
              className={`text-sm font-medium transition-colors ${
                pathname === "/api-docs"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              📚 API Docs
            </Link>

            {/* Si hay usuario autenticado */}
            {user ? (
              <>
                <Link
                  href="/profile"
                  className={`text-sm font-medium transition-colors ${
                    pathname.startsWith("/profile")
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Mi Perfil
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {user.name || user.email}
                  </span>
                  <LogoutButton />
                </div>
              </>
            ) : (
              // Si NO hay usuario autenticado
              showAuthButtons && (
                <div className="flex items-center gap-4">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
                  >
                    Registrarse
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
