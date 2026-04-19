import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { profile } from "@/data/portfolio";

export default function ContactFormPage() {
  return (
    <PageShell
      title="Contact Form"
      description="This route is kept active for compatibility with older links from the previous site."
    >
      <section className="max-w-3xl border border-[var(--line)] bg-white p-7 md:p-8">
        <p className="leading-relaxed text-[var(--muted)]">
          If you reached this page from an old link, use the main contact page to get in touch.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Go to Contact Page
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-[var(--line)] px-6 py-2.5 text-sm font-semibold text-[var(--text)]"
          >
            Email Directly
          </a>
        </div>
      </section>
    </PageShell>
  );
}
