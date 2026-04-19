import { MaterialIcon } from "@/components/material-icon";
import { PageShell } from "@/components/page-shell";
import { projects } from "@/data/portfolio";

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      description="A mix of backend services, systems tooling, and graphics/network projects built across academic and professional work."
    >
      <section className="space-y-4">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group border border-[var(--line)] bg-white p-6 transition hover:border-[var(--accent)] md:p-7"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h2 className="icon-label text-2xl text-[var(--text)] md:text-3xl">
                <MaterialIcon name="terminal" className="text-2xl" />
                {project.title}
              </h2>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="icon-label text-sm font-semibold text-[var(--accent)] opacity-90 transition group-hover:opacity-100"
              >
                <MaterialIcon name="open_in_new" className="text-base" />
                Repository
              </a>
            </div>
            <p className="mt-3 max-w-3xl leading-relaxed text-[var(--muted)]">{project.description}</p>
            <p className="icon-label mt-4 font-mono text-xs tracking-[0.13em] text-[var(--muted)] uppercase">
              <MaterialIcon name="memory" className="text-sm" />
              {project.stack.join(" • ")}
            </p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
