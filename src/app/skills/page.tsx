import { MaterialIcon } from "@/components/material-icon";
import { PageShell } from "@/components/page-shell";
import { skillGroups } from "@/data/portfolio";

function SkillList({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  return (
    <article className="border border-[var(--line)] bg-[var(--surface-strong)] p-7 md:p-8">
      <h2 className="icon-label font-display text-2xl text-[var(--text)] md:text-3xl">
        <MaterialIcon name={icon} className="text-2xl" />
        {title}
      </h2>
      <ul className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="icon-label rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--muted)]">
            <MaterialIcon name="check_circle" className="text-sm" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function SkillsPage() {
  return (
    <PageShell
      title="Skills"
      description="Core programming, platform, and engineering foundations from project work and production support."
    >
      <section className="space-y-5">
        <SkillList title="Languages" icon="code" items={skillGroups.languages} />
        <SkillList title="Technologies" icon="build" items={skillGroups.technologies} />
        <SkillList title="Coursework Foundations" icon="school" items={skillGroups.courses} />
      </section>
    </PageShell>
  );
}
