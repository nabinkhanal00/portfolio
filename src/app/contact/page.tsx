import type { Metadata } from "next";
import { ContactPanel } from "@/components/contact-panel";
import { PageShell } from "@/components/page-shell";
import { pageCopy } from "@/data/portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("contact");

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      description={pageCopy.contact.intro}
    >
      <ContactPanel />
    </PageShell>
  );
}
