import { PageShell } from "@/components/page-shell";
import { skillGroups } from "@/data/portfolio";

function SkillList({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="border border-[var(--line)] bg-white p-7 md:p-8">
      <h2 className="font-display text-2xl text-[var(--text)] md:text-3xl">{title}</h2>
      <ul className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--muted)]">
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
        <SkillList title="Languages" items={skillGroups.languages} />
        <SkillList title="Technologies" items={skillGroups.technologies} />
        <SkillList title="Coursework Foundations" items={skillGroups.courses} />
      </section>
    </PageShell>
  );
}
