import { PageShell } from "@/components/page-shell";
import { education, profile, spokenLanguages } from "@/data/portfolio";

export default function AboutPage() {
  return (
    <PageShell
      title="About"
      description="Computer engineer focused on backend systems, troubleshooting, and practical platform reliability work."
    >
      <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <article className="space-y-5 border border-[var(--line)] bg-[var(--surface)] p-7 md:p-8">
          <h2 className="font-display text-2xl text-[var(--text)] md:text-3xl">Profile</h2>
          <p className="leading-relaxed text-[var(--muted)]">{profile.summary}</p>
          <p className="leading-relaxed text-[var(--muted)]">
            I enjoy system debugging, production support, API engineering, and solving operational bottlenecks with
            lightweight automation.
          </p>
        </article>

        <aside className="space-y-5 border border-[var(--line)] bg-white p-7 md:p-8">
          <h2 className="font-display text-2xl text-[var(--text)]">Languages</h2>
          <ul className="space-y-2 text-[var(--muted)]">
            {spokenLanguages.map((language) => (
              <li key={language}>• {language}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mt-10 space-y-6">
        <h2 className="font-display text-2xl text-[var(--text)] md:text-3xl">Education</h2>
        {education.map((item) => (
          <article key={item.period} className="border border-[var(--line)] bg-white p-7 md:p-8">
            <p className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">{item.period}</p>
            <h3 className="mt-2 text-2xl text-[var(--text)]">{item.degree}</h3>
            <p className="mt-1 text-[var(--muted)]">{item.institution}</p>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">{item.notes}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
