import type { Metadata } from "next";
import { GitHubIcon } from "@/components/github-icon";
import { MaterialIcon } from "@/components/material-icon";
import { PageShell } from "@/components/page-shell";
import { projects, siteMetadata } from "@/data/portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("projects");

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      description={siteMetadata.routes.projects.description}
    >
      <section className="space-y-4">
        {projects.map((project) => (
          <article
            key={project.title}
            className="card-hover group rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 md:p-7"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h2 className="icon-label text-2xl text-[var(--text)] md:text-3xl">
                <MaterialIcon name="terminal" className="text-2xl" />
                {project.title}
              </h2>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} on GitHub`}
                title={`Open ${project.title} on GitHub`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--accent)] opacity-90 transition group-hover:opacity-100 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
              >
                <GitHubIcon className="h-5 w-5" />
                <span className="sr-only">Open {project.title} on GitHub</span>
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
