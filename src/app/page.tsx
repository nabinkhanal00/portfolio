import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { education, experience, profile, projects } from "@/data/portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("home");

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="page-main"
    >
      <section className="page-hero relative border-b border-[var(--line)]">
        {/* Decorative Grid Background */}
        <div className="bg-dot-grid absolute inset-0 -z-20 opacity-40"></div>

        {/* Integrated Profile Image (Mobile & Desktop) */}
        <div className="pointer-events-none absolute inset-0 -z-10 flex h-full w-full items-start justify-center md:justify-end">
          {/* Mobile version (Top-centered) */}
          <div className="mask-bottom-fade relative flex h-[350px] w-full items-start justify-center overflow-hidden md:hidden">
            <Image
              src="/images/nabin-professional-headshot-transparent.png"
              alt="Portrait of Nabin Khanal"
              width={921}
              height={1152}
              priority
              className="h-full w-auto object-contain"
            />
          </div>

          {/* Desktop version (Right-aligned, Top-aligned) */}
          <div className="relative hidden h-full w-[50%] items-start justify-end overflow-hidden md:flex lg:w-[45%]">
            <div className="relative mr-[-10%] pt-10 md:pt-12 lg:mr-[0%] lg:pt-16">
              <Image
                src="/images/nabin-professional-headshot-transparent.png"
                alt="Portrait of Nabin Khanal"
                width={921}
                height={1152}
                priority
                className="h-[500px] w-auto object-contain lg:h-[600px]"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-xl pt-10 md:pt-12 lg:pt-16">
          <p className="icon-label animate-rise-in font-mono text-xs font-bold tracking-[0.3em] text-[var(--accent)] uppercase">
            <MaterialIcon name="engineering" className="text-sm" />
            {profile.role}
          </p>
          <h1 className="animate-rise-delay mt-6 font-display text-3xl leading-[1.1] font-bold text-[var(--text)] sm:text-4xl md:mt-8 md:text-5xl lg:text-6xl">
            {profile.headline}
          </h1>
          <p className="animate-rise-delay mt-8 max-w-2xl text-lg leading-relaxed text-[var(--muted)] md:mt-10 md:text-xl">
            {profile.summary}
          </p>
        </div>
      </section>

      <section className="grid gap-12 border-b border-[var(--line)] py-20 md:grid-cols-[0.7fr_1.3fr]">
        <div className="sticky-section-title space-y-4">
          <h2 className="icon-label font-display text-4xl text-[var(--text)]">
            <MaterialIcon name="work_history" className="text-3xl text-[var(--accent)]" />
            Experience
          </h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            My professional journey so far.
          </p>
        </div>
        <div className="space-y-12">
          {experience.slice(0, 2).map((item) => (
            <article key={`${item.organization}-${item.period}`} className="card-hover group relative rounded-3xl border border-transparent p-8 pl-8 transition-all hover:bg-[var(--surface-strong)] before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-[var(--line)] last:before:h-[calc(100%-8px)]">
              <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-[var(--accent)] ring-4 ring-[var(--accent-soft)]"></div>
              <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
                {item.period}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[var(--text)]">{item.role}</h3>
              <p className="mt-1 text-lg text-[var(--muted)]">
                {item.organization}
              </p>
              <ul className="mt-6 space-y-3">
                {item.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--muted)]">
                    <MaterialIcon name="check_circle" className="mt-1 text-sm text-[var(--accent)] opacity-50" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-12 border-b border-[var(--line)] py-20 md:grid-cols-[0.7fr_1.3fr]">
        <div className="sticky-section-title space-y-4">
          <h2 className="icon-label font-display text-4xl text-[var(--text)]">
            <MaterialIcon name="deployed_code" className="text-3xl text-[var(--accent)]" />
            Projects
          </h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            A selection of my recent work and open-source contributions.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="card-hover group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-8"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[var(--accent-soft)] opacity-0 transition-opacity group-hover:opacity-20"></div>
              <h3 className="icon-label text-2xl font-medium text-[var(--text)]">
                <MaterialIcon name="rocket_launch" className="text-2xl text-[var(--accent)]" />
                {project.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span key={tech} className="rounded-full border border-[var(--line)] px-3 py-1 text-[10px] font-medium tracking-wider text-[var(--muted)] uppercase">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
          <Link href="/projects" className="icon-label mt-4 inline-flex items-center self-start rounded-full bg-[var(--accent-soft)] px-6 py-3 text-sm font-bold text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-white">
            <MaterialIcon name="east" className="text-lg" />
            Explore all projects
          </Link>
        </div>
      </section>

      <section className="grid gap-12 py-20 md:grid-cols-[0.7fr_1.3fr]">
        <div className="sticky-section-title space-y-4">
          <h2 className="icon-label font-display text-4xl text-[var(--text)]">
            <MaterialIcon name="school" className="text-3xl text-[var(--accent)]" />
            Education
          </h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Academic background and certifications.
          </p>
        </div>
        <div className="space-y-10">
          {education.map((item) => (
            <article key={item.period} className="card-hover group relative rounded-3xl border border-dashed border-[var(--line)] p-8 hover:bg-[var(--surface)]">
              <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase">
                {item.period}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-[var(--text)]">{item.degree}</h3>
              <p className="icon-label mt-2 text-lg text-[var(--muted)]">
                <MaterialIcon name="domain" className="text-base text-[var(--accent)] opacity-70" />
                {item.institution}
              </p>
              {item.notes && <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)] opacity-80">{item.notes}</p>}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
