import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { PageShell } from "@/components/page-shell";
import { profile } from "@/data/portfolio";

export default function ContactFormPage() {
  return (
    <PageShell
      title="Contact Form"
      description="This route is kept active for compatibility with older links from the previous site."
    >
      <section className="max-w-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-7 md:p-8">
        <p className="leading-relaxed text-[var(--muted)]">
          If you reached this page from an old link, use the main contact page to get in touch.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="btn btn-primary"
          >
            <MaterialIcon name="contact_page" className="text-base" />
            Go to Contact Page
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="btn btn-secondary"
          >
            <MaterialIcon name="mail" className="text-base" />
            Email Directly
          </a>
        </div>
      </section>
    </PageShell>
  );
}
