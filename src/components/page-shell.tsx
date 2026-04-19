import { ReactNode } from "react";
import { MaterialIcon } from "@/components/material-icon";

type PageShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="page-main"
    >
      <section className="mb-14 max-w-3xl animate-rise-in">
        <p className="icon-label mb-2 text-xs tracking-[0.24em] text-[var(--muted)] uppercase">
          <MaterialIcon name="article" className="text-sm" />
          Portfolio
        </p>
        <h1 className="font-display text-3xl leading-tight text-[var(--text)] sm:text-4xl md:text-6xl">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-lg">{description}</p>
      </section>
      {children}
    </main>
  );
}
