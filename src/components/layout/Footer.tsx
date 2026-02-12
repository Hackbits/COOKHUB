import Link from "next/link";

const footerLinks = [
  { href: "/discovery", label: "Discovery" },
  { href: "/fridge-raid", label: "Fridge Raid" },
  { href: "/community", label: "Community" },
  { href: "/creator-studio", label: "Creator Studio" },
];

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-900 text-white/50 mt-12">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-2xl">
              restaurant
            </span>
            <span className="text-xl font-bold text-white logo-font italic">
              COOKHUB
            </span>
          </Link>
          <nav className="flex flex-wrap justify-center gap-8 text-sm font-semibold">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs">© 2024 COOKHUB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
