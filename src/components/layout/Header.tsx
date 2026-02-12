"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import AuthModal from "@/components/auth/AuthModal";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useMounted } from "@/lib/hooks";

const navLinks = [
  { href: "/discovery", label: "Discovery" },
  { href: "/fridge-raid", label: "Fridge Raid" },
  { href: "/community", label: "Community" },
];

export default function Header() {
  const pathname = usePathname();
  const { isLoggedIn, name, avatar, logout } = useUserStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isMounted = useMounted();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-50 transition-all">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-12">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary cursor-pointer"
            >
              <span className="material-symbols-outlined text-3xl font-bold">
                restaurant
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-primary logo-font italic">
                COOKHUB
              </h1>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors cursor-pointer ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-gray-500 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Shopping List */}
            <Link
              href="/shopping-list"
              className="text-gray-400 hover:text-primary transition-colors hidden sm:block"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>

            {/* Notifications */}
            <button className="text-gray-400 hover:text-primary transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            </button>

            {/* Auth / User */}
            {isMounted && isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-9 h-9 flex-shrink-0">
                    <Image
                      src={avatar || "/default-avatar.png"}
                      alt={name || "User"}
                      className="rounded-full object-cover ring-2 ring-primary/20"
                      fill
                    />
                  </div>
                  <span className="text-sm font-bold hidden sm:inline">
                    {name}
                  </span>
                  <span className="material-symbols-outlined text-gray-400 text-sm">
                    expand_more
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-slide-in z-50">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="material-symbols-outlined text-lg">
                        person
                      </span>
                      My Profile
                    </Link>
                    <Link
                      href="/library"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="material-symbols-outlined text-lg">
                        bookmark
                      </span>
                      My Library
                    </Link>
                    <Link
                      href="/shopping-list"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="material-symbols-outlined text-lg">
                        shopping_cart
                      </span>
                      Shopping List
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">
                        logout
                      </span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                size="sm"
                className="h-10"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-gray-500 hover:text-primary transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <span className="material-symbols-outlined text-2xl">
                {showMobileMenu ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-slide-in">
            <nav className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/shopping-list"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  shopping_cart
                </span>
                Shopping List
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
