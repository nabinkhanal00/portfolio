import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { PageShell } from "@/components/page-shell";
import { education, focusAreas, pageCopy, siteMetadata, spokenLanguages } from "@/data/portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("about");

export default function AboutPage() {
  return (
    <PageShell
      title="About"
      description={siteMetadata.routes.about.description}
    >
      <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <article className="card-hover rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 md:p-8">
          <h2 className="icon-label font-display text-2xl text-[var(--text)] md:text-3xl">
            <MaterialIcon name="person" className="text-2xl" />
            Profile
          </h2>
          <div className="mt-4 space-y-4">
            {pageCopy.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-[var(--muted)]">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/resume" className="btn btn-primary">
              <MaterialIcon name="description" className="text-base" />
              View resume
            </Link>
            <Link href="/projects" className="btn btn-secondary">
              <MaterialIcon name="deployed_code" className="text-base" />
              Systems projects
            </Link>
          </div>
        </article>

        <aside className="card-hover rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-7 md:p-8">
          <h2 className="icon-label font-display text-2xl text-[var(--text)]">
            <MaterialIcon name="translate" className="text-2xl" />
            Languages
          </h2>
          <ul className="space-y-3 text-[var(--muted)]">
            {spokenLanguages.map((language) => (
              <li key={language} className="flex items-start gap-3">
                <MaterialIcon name="speech_to_text" className="mt-0.5 shrink-0 text-base" />
                <span>{language}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {focusAreas.map((area) => (
          <article key={area.title} className="card-hover rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6">
            <h3 className="icon-label text-lg font-bold text-[var(--text)]">
              <MaterialIcon name={area.icon} className="text-xl text-[var(--accent)]" />
              {area.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{area.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 md:p-8">
        <h2 className="icon-label font-display text-2xl text-[var(--text)] md:text-3xl">
          <MaterialIcon name="neurology" className="text-2xl text-[var(--accent)]" />
          Why systems + AI
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-[var(--muted)]">
          Systems give you correctness, performance, and reliability guarantees — AI gives you leverage. I&apos;m interested in where they meet: ML-serving infrastructure that respects systems constraints, anomaly detection that actually reduces MTTR, and tooling that helps engineers reason faster without hiding the fundamentals.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed text-[var(--muted)]">
          Current explorations: Go/Rust systems programming, PyTorch for applied AI (see my partial-convolution inpainting project), and production debugging that informs better observability.
        </p>
      </section>

      <section className="mt-10 space-y-6">
        <h2 className="icon-label font-display text-2xl text-[var(--text)] md:text-3xl">
          <MaterialIcon name="school" className="text-2xl" />
          Education
        </h2>
        {education.map((item) => (
          <article key={item.period} className="card-hover rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-7 md:p-8">
            <p className="icon-label font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
              <MaterialIcon name="schedule" className="text-sm" />
              {item.period}
            </p>
            <h3 className="mt-2 text-2xl text-[var(--text)]">{item.degree}</h3>
            <p className="icon-label mt-1 text-[var(--muted)]">
              <MaterialIcon name="domain" className="text-base" />
              {item.institution}
            </p>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">{item.notes}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
