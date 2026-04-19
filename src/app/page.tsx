import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { education, experience, profile, projects } from "@/data/portfolio";

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <section className="grid min-h-[calc(100svh-9rem)] items-center gap-12 border-b border-[var(--line)] pb-16 md:grid-cols-[1.2fr_0.8fr] md:pb-24">
        <div>
          <p className="icon-label animate-rise-in font-mono text-xs tracking-[0.24em] text-[var(--muted)] uppercase">
            <MaterialIcon name="engineering" className="text-sm" />
            {profile.role}
          </p>
          <h1 className="animate-rise-delay mt-5 max-w-3xl font-display text-5xl leading-tight text-[var(--text)] md:text-7xl">
            Building resilient backend systems and practical engineering workflows.
          </h1>
          <p className="animate-rise-delay mt-7 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            {profile.summary}
          </p>
          <div className="animate-rise-delay mt-9 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="icon-label rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <MaterialIcon name="deployed_code" className="text-base" />
              View Projects
            </Link>
            <Link
              href="/contact"
              className="icon-label rounded-full border border-[var(--line)] px-6 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
            >
              <MaterialIcon name="mail" className="text-base" />
              Contact Me
            </Link>
          </div>
        </div>

        <aside className="space-y-7 border border-[var(--line)] bg-[color:var(--surface)] p-7 md:p-8">
          <div>
            <p className="icon-label text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
              <MaterialIcon name="location_on" className="text-sm" />
              Based In
            </p>
            <p className="icon-label mt-2 text-xl text-[var(--text)]">
              <MaterialIcon name="pin_drop" className="text-base" />
              {profile.location}
            </p>
          </div>
          <div>
            <p className="icon-label text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
              <MaterialIcon name="badge" className="text-sm" />
              Current Role
            </p>
            <p className="icon-label mt-2 text-xl text-[var(--text)]">
              <MaterialIcon name="work" className="text-base" />
              Solutions Engineer, Logpoint
            </p>
          </div>
          <div>
            <p className="icon-label text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
              <MaterialIcon name="alternate_email" className="text-sm" />
              Reach Out
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="icon-label mt-2 block text-lg text-[var(--accent)] hover:underline"
            >
              <MaterialIcon name="mail" className="text-base" />
              {profile.email}
            </a>
          </div>
        </aside>
      </section>

      <section className="grid gap-10 border-b border-[var(--line)] py-16 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="icon-label font-display text-3xl text-[var(--text)] md:sticky md:top-28 md:self-start">
          <MaterialIcon name="work_history" className="text-3xl" />
          Experience Snapshot
        </h2>
        <div className="space-y-8">
          {experience.slice(0, 2).map((item) => (
            <article key={`${item.organization}-${item.period}`} className="space-y-3">
              <p className="icon-label font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
                <MaterialIcon name="schedule" className="text-sm" />
                {item.period}
              </p>
              <h3 className="text-2xl text-[var(--text)]">{item.role}</h3>
              <p className="icon-label text-base text-[var(--muted)]">
                <MaterialIcon name="business" className="text-base" />
                {item.organization}
              </p>
              <ul className="space-y-2 text-[15px] leading-relaxed text-[var(--muted)]">
                {item.highlights.map((point) => (
                  <li key={point} className="icon-label items-start">
                    <MaterialIcon name="subdirectory_arrow_right" className="mt-0.5 text-base" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-10 border-b border-[var(--line)] py-16 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="icon-label font-display text-3xl text-[var(--text)] md:sticky md:top-28 md:self-start">
          <MaterialIcon name="deployed_code" className="text-3xl" />
          Featured Projects
        </h2>
        <div className="space-y-4">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="group border border-[var(--line)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
            >
              <h3 className="icon-label text-2xl text-[var(--text)]">
                <MaterialIcon name="rocket_launch" className="text-2xl" />
                {project.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{project.description}</p>
              <p className="icon-label mt-4 font-mono text-xs tracking-[0.13em] text-[var(--muted)] uppercase">
                <MaterialIcon name="memory" className="text-sm" />
                {project.stack.join(" • ")}
              </p>
            </article>
          ))}
          <Link href="/projects" className="icon-label inline-block pt-3 text-sm font-semibold text-[var(--accent)] hover:underline">
            <MaterialIcon name="open_in_new" className="text-base" />
            See all projects
          </Link>
        </div>
      </section>

      <section className="grid gap-10 py-16 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="icon-label font-display text-3xl text-[var(--text)] md:sticky md:top-28 md:self-start">
          <MaterialIcon name="school" className="text-3xl" />
          Education
        </h2>
        <div className="space-y-6">
          {education.map((item) => (
            <article key={item.period} className="border-b border-dashed border-[var(--line)] pb-6 last:border-b-0 last:pb-0">
              <p className="icon-label font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
                <MaterialIcon name="schedule" className="text-sm" />
                {item.period}
              </p>
              <h3 className="mt-2 text-2xl text-[var(--text)]">{item.degree}</h3>
              <p className="icon-label mt-1 text-[15px] text-[var(--muted)]">
                <MaterialIcon name="domain" className="text-base" />
                {item.institution}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">{item.notes}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
