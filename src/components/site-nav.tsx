import Link from "next/link";
import { navigation, profile } from "@/data/portfolio";

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[color:var(--surface)]/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.16em] text-[var(--text)] uppercase"
        >
          {profile.name}
        </Link>
        <nav className="flex items-center gap-4 overflow-x-auto text-sm whitespace-nowrap text-[var(--muted)] md:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1 transition hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
