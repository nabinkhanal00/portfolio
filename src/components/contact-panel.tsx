import { profile } from "@/data/portfolio";

export function ContactPanel() {
  return (
    <section className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
      <div className="space-y-6 border border-[var(--line)] bg-[var(--surface)] p-7 md:p-8">
        <h2 className="font-display text-2xl text-[var(--text)] md:text-3xl">Let&apos;s build something useful</h2>
        <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">
          Reach out for backend engineering, support engineering, or collaboration on systems-focused projects.
          I usually reply quickly via email.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}?subject=Hello%20Nabin`}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Email Me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--line)] px-5 py-2 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
      <aside className="space-y-3 border border-[var(--line)] bg-white p-7 md:p-8">
        <p className="text-xs tracking-[0.2em] text-[var(--muted)] uppercase">Contact Details</p>
        <p className="text-lg text-[var(--text)]">{profile.email}</p>
        <p className="text-base text-[var(--muted)]">{profile.phone}</p>
        <p className="text-base text-[var(--muted)]">{profile.location}</p>
        <a href={profile.website} className="text-sm text-[var(--accent)] hover:underline">
          {profile.website.replace("https://", "")}
        </a>
      </aside>
    </section>
  );
}
