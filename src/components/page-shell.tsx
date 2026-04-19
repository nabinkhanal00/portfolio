import { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <section className="mb-14 max-w-3xl animate-rise-in">
        <p className="mb-2 text-xs tracking-[0.24em] text-[var(--muted)] uppercase">Portfolio</p>
        <h1 className="font-display text-4xl leading-tight text-[var(--text)] md:text-6xl">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">{description}</p>
      </section>
      {children}
    </main>
  );
}
