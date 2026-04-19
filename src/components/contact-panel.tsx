import { MaterialIcon } from "@/components/material-icon";
import { pageCopy, profile } from "@/data/portfolio";

export function ContactPanel() {
  return (
    <section className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
      <div className="space-y-6 border border-[var(--line)] bg-[var(--surface)] p-7 md:p-8">
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
      </div>
      <aside className="space-y-3 border border-[var(--line)] bg-[var(--surface-strong)] p-7 md:p-8">
        <p className="icon-label text-xs tracking-[0.2em] text-[var(--muted)] uppercase">
          <MaterialIcon name="contact_page" className="text-sm" />
          Contact Details
        </p>
        <p className="icon-label text-lg text-[var(--text)]">
          <MaterialIcon name="mail" className="text-base" />
          {profile.email}
        </p>
        <p className="icon-label text-base text-[var(--muted)]">
          <MaterialIcon name="location_on" className="text-base" />
          {profile.location}
        </p>
        <a href={profile.website} className="icon-label text-sm text-[var(--accent)] hover:underline">
          <MaterialIcon name="language" className="text-base" />
          {profile.website.replace("https://", "")}
        </a>
      </aside>
    </section>
  );
}
