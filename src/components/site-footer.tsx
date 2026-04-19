import { profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-[var(--line)] py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 text-sm text-[var(--muted)] md:px-8 md:text-base">
        <p>
          {profile.name} • {profile.role}
        </p>
        <p>
          <a href={`mailto:${profile.email}`} className="hover:text-[var(--text)]">
            {profile.email}
          </a>
          {" • "}
          <a href={profile.github} className="hover:text-[var(--text)]">
            GitHub
          </a>
          {" • "}
          <a href={profile.linkedin} className="hover:text-[var(--text)]">
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}
