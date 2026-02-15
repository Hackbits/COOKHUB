import Link from "next/link";
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: "/discovery", label: "Discovery" },
  { href: "/fridge-raid", label: "Fridge Raid" },
  { href: "/community", label: "Community" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white/50 mt-12">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Utensils className="h-5 w-5" />
            <span className="text-xl font-bold text-white logo-font italic">
              COOKHUB
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-1">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/50 hover:text-white hover:bg-white/10 font-semibold"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2024 COOKHUB. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-white/30 hover:text-white/60 transition-colors text-xs"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/30 hover:text-white/60 transition-colors text-xs"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
