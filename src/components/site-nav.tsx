"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MaterialIcon } from "@/components/material-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigation, profile } from "@/data/portfolio";

type MobileMenuState = {
  open: boolean;
  path: string;
};

export function SiteNav() {
  const pathname = usePathname();
  const [mobileMenuState, setMobileMenuState] = useState<MobileMenuState>({
    open: false,
    path: pathname,
  });
  const mobileOpen = mobileMenuState.open && mobileMenuState.path === pathname;

  const toggleMobileMenu = () => {
    setMobileMenuState((current) => ({
      open: !(current.open && current.path === pathname),
      path: pathname,
    }));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[color:var(--surface)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Link
          href="/"
          className="text-xs font-semibold tracking-[0.16em] text-[var(--text)] uppercase sm:text-sm"
        >
          {profile.name}
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav aria-label="Primary" className="flex items-center gap-2 text-sm whitespace-nowrap text-[var(--muted)]">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`icon-label rounded-full px-3 py-1.5 transition hover:bg-[var(--accent-soft)] hover:text-[var(--text)] ${
                  pathname === item.href ? "bg-[var(--accent-soft)] text-[var(--text)]" : ""
                }`}
              >
                <MaterialIcon name={item.icon} className="text-base" />
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle className="rounded-full border border-[var(--line)] p-2 text-[var(--text)] transition hover:border-[var(--accent)]" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className="rounded-full border border-[var(--line)] p-2 text-[var(--text)] transition hover:border-[var(--accent)]" />
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="rounded-full border border-[var(--line)] p-2 text-[var(--text)] transition hover:border-[var(--accent)]"
          >
            <MaterialIcon name={mobileOpen ? "close" : "menu"} className="text-xl" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--line)] bg-[var(--surface-strong)] md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 text-sm text-[var(--muted)]">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`icon-label rounded-xl px-3 py-2 transition hover:bg-[var(--accent-soft)] hover:text-[var(--text)] ${
                  pathname === item.href ? "bg-[var(--accent-soft)] text-[var(--text)]" : ""
                }`}
              >
                <MaterialIcon name={item.icon} className="text-base" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
