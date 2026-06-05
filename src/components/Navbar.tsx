"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "About" },
  { href: "/portfolio", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[var(--border-light)] bg-[rgba(253,251,247,0.9)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1100px] items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="font-display text-[1.15rem] font-bold tracking-tight text-[var(--text)] no-underline"
        >
          Adhitama <span className="italic text-[var(--primary)]">Wichaksono</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const isContact = item.href === "/contact";
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    isContact
                      ? "rounded-[var(--radius-sm)] bg-[var(--primary)] px-[1.1rem] py-[0.45rem] text-[0.85rem] font-semibold text-white transition-all hover:bg-[var(--primary-hover)]"
                      : `relative text-[0.85rem] font-medium transition-colors ${
                          active
                            ? "text-[var(--text)] after:w-full"
                            : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                        } after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 after:bg-[var(--primary)] after:transition-all hover:after:w-full`
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="text-[var(--text)] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--border-light)] bg-[var(--bg-primary)] px-8 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block text-[0.9rem] font-medium ${
                    pathname === item.href
                      ? "text-[var(--primary)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
