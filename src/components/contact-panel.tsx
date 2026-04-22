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
        <div className="grid gap-6 border-t border-[var(--line)] pt-8 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase">Location</p>
              <p className="mt-1 flex items-center gap-2 text-base text-[var(--text)]">
                <MaterialIcon name="location_on" className="text-base text-[var(--accent)]" />
                {profile.location}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase">Current Role</p>
              <p className="mt-1 flex items-center gap-2 text-base text-[var(--text)]">
                <MaterialIcon name="work" className="text-base text-[var(--accent)]" />
                {profile.currentRole} @ {profile.currentCompany}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase">Contact Email</p>
              <a href={`mailto:${profile.email}`} className="mt-1 flex items-center gap-2 text-base text-[var(--accent)] hover:underline">
                <MaterialIcon name="mail" className="text-base" />
                {profile.email}
              </a>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase">Website</p>
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-2 text-base text-[var(--accent)] hover:underline">
                <MaterialIcon name="language" className="text-base" />
                {profile.website.replace("https://", "")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
