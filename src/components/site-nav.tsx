"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/material-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigation, profile } from "@/data/portfolio";

const primaryHrefs = new Set(["/", "/projects", "/blog", "/about"]);
const primaryNav = navigation.filter((n) => primaryHrefs.has(n.href));
const moreNav = navigation.filter((n) => !primaryHrefs.has(n.href));

export function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: MouseEvent) => {
      const el = document.getElementById("more-popover");
      const btn = document.getElementById("more-button");
      if (el && !el.contains(e.target as Node) && btn && !btn.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [moreOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[color:var(--surface)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[52px] w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="shrink-0 font-mono text-xs font-semibold tracking-[0.18em] text-[var(--text)] uppercase">
          {profile.name}
        </Link>

        {/* Desktop: minimal text links, not pills */}
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 font-mono text-[11px] font-medium tracking-[0.14em] uppercase transition-colors ${active ? "text-[var(--text)]" : "text-[var(--muted)] hover:text-[var(--text)]"}`}
              >
                {item.label}
                {active && <span className="absolute inset-x-0 -bottom-1 h-px bg-[var(--text)]" />}
              </Link>
            );
          })}
        </nav>

        {/* Tablet: 4 primary + More */}
        <nav aria-label="Primary tablet" className="hidden items-center gap-5 md:flex lg:hidden">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`font-mono text-[11px] tracking-[0.14em] uppercase ${active ? "text-[var(--text)] underline decoration-[var(--text)] underline-offset-4" : "text-[var(--muted)] hover:text-[var(--text)]"}`}>
                {item.label}
              </Link>
            );
          })}
          <div className="relative">
            <button
              id="more-button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.14em] text-[var(--muted)] uppercase hover:text-[var(--text)]"
            >
              More <MaterialIcon name={moreOpen ? "expand_less" : "expand_more"} className="text-sm" />
            </button>
            {moreOpen && (
              <div id="more-popover" className="absolute right-0 top-8 w-64 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-2 shadow-xl">
                <p className="px-2 py-1 font-mono text-[10px] font-bold tracking-[0.16em] text-[var(--muted)] uppercase">Explore</p>
                {moreNav.map((item) => (
                  <Link key={item.href} href={item.href} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${pathname === item.href ? "bg-[var(--accent-soft)] text-[var(--text)]" : "text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"}`}>
                    <MaterialIcon name={item.icon} className="text-base" />{item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="h-8 w-8 rounded-full border border-[var(--line)] text-[var(--text)] transition hover:border-[var(--accent)]" />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text)] hover:border-[var(--accent)] md:hidden"
          >
            <MaterialIcon name={mobileOpen ? "close" : "menu"} className="text-lg" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--line)] bg-[var(--surface-strong)] md:hidden">
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-4">
            <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-[var(--muted)] uppercase">Navigate</p>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm ${pathname === item.href ? "bg-[var(--accent-soft)] text-[var(--text)]" : "text-[var(--muted)]"}`}>
                  <MaterialIcon name={item.icon} className="text-base" />{item.label}
                </Link>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10px] font-bold tracking-[0.18em] text-[var(--muted)] uppercase">Explore</p>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {moreNav.map((item) => (
                <Link key={item.href} href={item.href} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm ${pathname === item.href ? "bg-[var(--accent-soft)] text-[var(--text)]" : "text-[var(--muted)]"}`}>
                  <MaterialIcon name={item.icon} className="text-base" />{item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
