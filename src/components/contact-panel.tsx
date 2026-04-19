import { MaterialIcon } from "@/components/material-icon";
import { pageCopy, profile } from "@/data/portfolio";

export function ContactPanel() {
  return (
    <section className="max-w-4xl border border-[var(--line)] bg-[var(--surface)] p-7 md:p-8">
      <div className="space-y-6">
        <h2 className="icon-label font-display text-2xl text-[var(--text)] md:text-3xl">
          <MaterialIcon name="handshake" className="text-2xl" />
          {pageCopy.contact.heading}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">
          {pageCopy.contact.summary}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}?subject=Hello%20Nabin`}
            className="btn btn-primary"
          >
            <MaterialIcon name="mail" className="text-base" />
            Email Me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <MaterialIcon name="group" className="text-base" />
            Connect on LinkedIn
          </a>
        </div>
        <div className="grid gap-4 border-t border-[var(--line)] pt-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
          <p className="flex items-start gap-3 text-lg text-[var(--text)]">
            <MaterialIcon name="mail" className="mt-1 shrink-0 text-base" />
            <span className="min-w-0 break-all">{profile.email}</span>
          </p>
          <p className="flex items-start gap-3 text-base text-[var(--muted)] md:justify-self-end">
            <MaterialIcon name="location_on" className="mt-0.5 shrink-0 text-base" />
            <span>{profile.location}</span>
          </p>
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 text-sm text-[var(--accent)] hover:underline md:col-span-2"
          >
            <MaterialIcon name="language" className="mt-0.5 shrink-0 text-base" />
            <span>{profile.website.replace("https://", "")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
