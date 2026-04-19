import { PageShell } from "@/components/page-shell";
import { campusWork, experience } from "@/data/portfolio";

export default function WorkPage() {
  return (
    <PageShell
      title="Work"
      description="Professional roles and community contributions focused on troubleshooting, backend systems, and engineering mentorship."
    >
      <section className="space-y-5">
        {experience.map((item) => (
          <article key={`${item.role}-${item.period}`} className="border border-[var(--line)] bg-white p-7 md:p-8">
            <p className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">{item.period}</p>
            <h2 className="mt-2 text-2xl text-[var(--text)] md:text-3xl">{item.role}</h2>
            <p className="mt-1 text-[var(--muted)]">{item.organization}</p>
            <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-[var(--muted)]">
              {item.highlights.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-10 border border-[var(--line)] bg-[var(--surface)] p-7 md:p-8">
        <h2 className="font-display text-2xl text-[var(--text)] md:text-3xl">Campus and Community</h2>
        <div className="mt-6 space-y-5">
          {campusWork.map((item) => (
            <article key={`${item.year}-${item.title}`} className="border-b border-dashed border-[var(--line)] pb-5 last:border-b-0 last:pb-0">
              <p className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">{item.year}</p>
              <h3 className="mt-1 text-xl text-[var(--text)]">{item.title}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.place}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{item.details}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
