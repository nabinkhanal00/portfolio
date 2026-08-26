import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { PageShell } from "@/components/page-shell";
import { experience, education, siteMetadata } from "@/data/portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("resume");

export default function ResumePage() {
  return (
    <PageShell
      title="Resume"
      description={siteMetadata.routes.resume.description}
    >
      <div className="flex flex-wrap gap-3">
        <a
          href="/Resume.pdf"
          download
          className="btn btn-primary"
        >
          <MaterialIcon name="download" className="text-base" />
          Download PDF
        </a>
        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          <MaterialIcon name="open_in_new" className="text-base" />
          Open in new tab
        </a>
        <Link href="/contact" className="btn btn-secondary">
          <MaterialIcon name="mail" className="text-base" />
          Contact me
        </Link>
      </div>

      {/* Quick highlights */}
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="card-hover rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6">
          <p className="icon-label text-xs font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
            <MaterialIcon name="lan" className="text-sm" />
            Focus
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Distributed systems, OS, networking, and reliable infrastructure — with AI for observability & automation.
          </p>
        </article>
        <article className="card-hover rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6">
          <p className="icon-label text-xs font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
            <MaterialIcon name="terminal" className="text-sm" />
            Stack
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Go, Rust, C/C++, Python • Linux, Docker • PyTorch, FastAPI</p>
        </article>
        <article className="card-hover rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6">
          <p className="icon-label text-xs font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
            <MaterialIcon name="location_on" className="text-sm" />
            Location
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Lalitpur, Nepal • Open to systems & AI-infra roles</p>
        </article>
      </section>

      {/* Inline preview */}
      <section className="mt-10 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)]">
        <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-4">
          <h2 className="icon-label text-sm font-bold tracking-[0.18em] text-[var(--muted)] uppercase">
            <MaterialIcon name="description" className="text-base text-[var(--accent)]" />
            Resume preview
          </h2>
          <span className="hidden text-xs text-[var(--muted)] md:inline">If preview doesn&apos;t load, use Download PDF above.</span>
        </div>
        <div className="bg-[var(--surface)] p-2 md:p-3">
          <object
            data="/Resume.pdf#view=FitH"
            type="application/pdf"
            className="h-[75vh] w-full rounded-2xl border border-[var(--line)] bg-white md:h-[900px]"
          >
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
              <MaterialIcon name="picture_as_pdf" className="text-4xl text-[var(--muted)]" />
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                PDF preview isn&apos;t supported in this browser.
                <br />
                <a href="/Resume.pdf" download className="font-semibold text-[var(--accent)] hover:underline">
                  Download the resume PDF
                </a>{" "}
                instead.
              </p>
            </div>
          </object>
        </div>
      </section>

      {/* Text fallback for ATS / SEO */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-7">
          <h3 className="icon-label text-lg font-bold text-[var(--text)]">
            <MaterialIcon name="work_history" className="text-xl text-[var(--accent)]" />
            Experience snapshot
          </h3>
          <ul className="mt-4 space-y-3">
            {experience.map((e) => (
              <li key={e.period} className="text-sm leading-relaxed text-[var(--muted)]">
                <span className="font-semibold text-[var(--text)]">{e.role}</span> — {e.organization}
                <span className="block font-mono text-xs tracking-wide opacity-70">{e.period}</span>
              </li>
            ))}
          </ul>
          <Link href="/work" className="icon-label mt-4 inline-flex text-sm font-semibold text-[var(--accent)] hover:underline">
            <MaterialIcon name="east" className="text-base" />
            Full work history
          </Link>
        </article>
        <article className="rounded-3xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-7">
          <h3 className="icon-label text-lg font-bold text-[var(--text)]">
            <MaterialIcon name="school" className="text-xl text-[var(--accent)]" />
            Education
          </h3>
          <ul className="mt-4 space-y-3">
            {education.map((ed) => (
              <li key={ed.period} className="text-sm leading-relaxed text-[var(--muted)]">
                <span className="font-semibold text-[var(--text)]">{ed.degree}</span> — {ed.institution}
                <span className="block font-mono text-xs tracking-wide opacity-70">{ed.period}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className="icon-label mt-4 inline-flex text-sm font-semibold text-[var(--accent)] hover:underline">
            <MaterialIcon name="east" className="text-base" />
            More about me
          </Link>
        </article>
      </section>
    </PageShell>
  );
}
