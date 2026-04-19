import { MaterialIcon } from "@/components/material-icon";
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
            <p className="icon-label font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
              <MaterialIcon name="schedule" className="text-sm" />
              {item.period}
            </p>
            <h2 className="mt-2 text-2xl text-[var(--text)] md:text-3xl">{item.role}</h2>
            <p className="icon-label mt-1 text-[var(--muted)]">
              <MaterialIcon name="business" className="text-base" />
              {item.organization}
            </p>
            <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-[var(--muted)]">
              {item.highlights.map((point) => (
                <li key={point} className="icon-label items-start">
                  <MaterialIcon name="subdirectory_arrow_right" className="mt-0.5 text-base" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-10 border border-[var(--line)] bg-[var(--surface)] p-7 md:p-8">
        <h2 className="icon-label font-display text-2xl text-[var(--text)] md:text-3xl">
          <MaterialIcon name="groups" className="text-2xl" />
          Campus and Community
        </h2>
        <div className="mt-6 space-y-5">
          {campusWork.map((item) => (
            <article key={`${item.year}-${item.title}`} className="border-b border-dashed border-[var(--line)] pb-5 last:border-b-0 last:pb-0">
              <p className="icon-label font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
                <MaterialIcon name="calendar_month" className="text-sm" />
                {item.year}
              </p>
              <h3 className="mt-1 text-xl text-[var(--text)]">{item.title}</h3>
              <p className="icon-label mt-1 text-sm text-[var(--muted)]">
                <MaterialIcon name="location_on" className="text-base" />
                {item.place}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{item.details}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
