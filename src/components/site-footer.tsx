import { MaterialIcon } from "@/components/material-icon";
import { profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-[var(--line)] py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 text-sm text-[var(--muted)] md:px-8 md:text-base">
        <p>
          {profile.name} • {profile.role}
        </p>
        <p aria-label="Footer links">
          <a href={`mailto:${profile.email}`} className="icon-label hover:text-[var(--text)]">
            <MaterialIcon name="mail" className="text-base" />
            {profile.email}
          </a>
          {" • "}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-label hover:text-[var(--text)]">
            <MaterialIcon name="code" className="text-base" />
            GitHub
          </a>
          {" • "}
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-label hover:text-[var(--text)]">
            <MaterialIcon name="link" className="text-base" />
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}
