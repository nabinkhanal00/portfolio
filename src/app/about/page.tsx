import type { Metadata } from "next";
import { MaterialIcon } from "@/components/material-icon";
import { PageShell } from "@/components/page-shell";
import { education, pageCopy, siteMetadata, spokenLanguages } from "@/data/portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("about");

export default function AboutPage() {
  return (
    <PageShell
      title="About"
      description={siteMetadata.routes.about.description}
    >
      <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <article className="space-y-5 border border-[var(--line)] bg-[var(--surface)] p-7 md:p-8">
          <h2 className="icon-label font-display text-2xl text-[var(--text)] md:text-3xl">
            <MaterialIcon name="person" className="text-2xl" />
            Profile
          </h2>
          {pageCopy.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--muted)]">
              {paragraph}
            </p>
          ))}
        </article>

        <aside className="space-y-5 border border-[var(--line)] bg-[var(--surface-strong)] p-7 md:p-8">
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

      <section className="mt-10 space-y-6">
        <h2 className="icon-label font-display text-2xl text-[var(--text)] md:text-3xl">
          <MaterialIcon name="school" className="text-2xl" />
          Education
        </h2>
        {education.map((item) => (
          <article key={item.period} className="border border-[var(--line)] bg-[var(--surface-strong)] p-7 md:p-8">
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
