import Link from "next/link";
import { education, experience, profile, projects } from "@/data/portfolio";

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <section className="grid min-h-[calc(100svh-9rem)] items-center gap-12 border-b border-[var(--line)] pb-16 md:grid-cols-[1.2fr_0.8fr] md:pb-24">
        <div>
          <p className="animate-rise-in font-mono text-xs tracking-[0.24em] text-[var(--muted)] uppercase">
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
              className="rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[var(--line)] px-6 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
            >
              Contact Me
            </Link>
          </div>
        </div>

        <aside className="space-y-7 border border-[var(--line)] bg-[color:var(--surface)] p-7 md:p-8">
          <div>
            <p className="text-xs tracking-[0.16em] text-[var(--muted)] uppercase">Based In</p>
            <p className="mt-2 text-xl text-[var(--text)]">{profile.location}</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-[var(--muted)] uppercase">Current Role</p>
            <p className="mt-2 text-xl text-[var(--text)]">Solutions Engineer, Logpoint</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-[var(--muted)] uppercase">Reach Out</p>
            <a href={`mailto:${profile.email}`} className="mt-2 block text-lg text-[var(--accent)] hover:underline">
              {profile.email}
            </a>
          </div>
        </aside>
      </section>

      <section className="grid gap-10 border-b border-[var(--line)] py-16 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="font-display text-3xl text-[var(--text)] md:sticky md:top-28 md:self-start">Experience Snapshot</h2>
        <div className="space-y-8">
          {experience.slice(0, 2).map((item) => (
            <article key={`${item.organization}-${item.period}`} className="space-y-3">
              <p className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">{item.period}</p>
              <h3 className="text-2xl text-[var(--text)]">{item.role}</h3>
              <p className="text-base text-[var(--muted)]">{item.organization}</p>
              <ul className="space-y-2 text-[15px] leading-relaxed text-[var(--muted)]">
                {item.highlights.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-10 border-b border-[var(--line)] py-16 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="font-display text-3xl text-[var(--text)] md:sticky md:top-28 md:self-start">Featured Projects</h2>
        <div className="space-y-4">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="group border border-[var(--line)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
            >
              <h3 className="text-2xl text-[var(--text)]">{project.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{project.description}</p>
              <p className="mt-4 font-mono text-xs tracking-[0.13em] text-[var(--muted)] uppercase">
                {project.stack.join(" • ")}
              </p>
            </article>
          ))}
          <Link href="/projects" className="inline-block pt-3 text-sm font-semibold text-[var(--accent)] hover:underline">
            See all projects
          </Link>
        </div>
      </section>

      <section className="grid gap-10 py-16 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="font-display text-3xl text-[var(--text)] md:sticky md:top-28 md:self-start">Education</h2>
        <div className="space-y-6">
          {education.map((item) => (
            <article key={item.period} className="border-b border-dashed border-[var(--line)] pb-6 last:border-b-0 last:pb-0">
              <p className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">{item.period}</p>
              <h3 className="mt-2 text-2xl text-[var(--text)]">{item.degree}</h3>
              <p className="mt-1 text-[15px] text-[var(--muted)]">{item.institution}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">{item.notes}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
