"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import AuthModal from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useMounted } from "@/lib/hooks";
import { SocketIndicator } from "@/components/socket-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotificationStore } from "@/store/useNotificationStore";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import {
  Bell,
  Bookmark,
  ChevronDown,
  LogOut,
  ShoppingCart,
  User,
  Utensils,
  Menu,
} from "lucide-react";

const navLinks = [
  { href: "/discovery", label: "Discovery" },
  { href: "/fridge-raid", label: "Fridge Raid" },
  { href: "/community", label: "Community" },
];

export default function Header() {
  const pathname = usePathname();
  const { isLoggedIn, name, avatar, logout } = useUserStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } =
    useNotificationStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
              <Utensils />
              <h1 className="text-2xl font-bold tracking-tight text-primary logo-font italic">
                COOKHUB
              </h1>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={
                      pathname === link.href
                        ? "text-primary bg-primary/5 font-semibold"
                        : "text-gray-500 hover:text-primary font-semibold"
                    }
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <SocketIndicator />
            </div>
            {/* Shopping List */}
            <Link href="/shopping-list" className="hidden sm:inline-flex">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-primary"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group">
                  <Bell className="h-5 w-5 text-gray-500 group-hover:text-primary transition-colors" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50/50">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="xs"
                      className="h-auto px-2 py-0.5 text-xs text-primary hover:text-primary/80 hover:bg-transparent"
                      onClick={markAllAsRead}
                    >
                      Mark all read
                    </Button>
                  )}
                </div>
                <ScrollArea className="h-[300px]">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                      <Bell className="h-8 w-8 mb-2 opacity-20" />
                      <p className="text-sm">No notifications yet</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 p-2">
                      {notifications.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          onRead={markAsRead}
                        />
                      ))}
                    </div>
                  )}
                </ScrollArea>
                {notifications.length > 0 && (
                  <div className="p-2 border-t bg-gray-50/50 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full h-8 text-xs text-muted-foreground"
                      onClick={clearAll}
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth / User */}
            {isMounted && isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={avatar || "/default-avatar.png"}
                        alt={name || "User"}
                      />
                      <AvatarFallback>
                        {name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden sm:inline">
                      {name}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/library">
                      <Bookmark className="h-4 w-4 mr-2" />
                      My Library
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                size="sm"
                className="h-10"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 text-gray-500 hover:text-primary transition-colors rounded-md hover:bg-gray-50">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-primary">
                    <Utensils className="h-5 w-5" />
                    <span className="logo-font italic">COOKHUB</span>
                  </SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${
                          pathname === link.href
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-gray-600 font-semibold"
                        }`}
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  <Link
                    href="/shopping-list"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-600 font-semibold"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Shopping List
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
