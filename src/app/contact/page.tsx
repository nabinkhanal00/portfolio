import { ContactPanel } from "@/components/contact-panel";
import { PageShell } from "@/components/page-shell";

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      description="For project collaboration, backend work, or support engineering opportunities, send a message and I will respond soon."
    >
      <ContactPanel />
    </PageShell>
  );
}
