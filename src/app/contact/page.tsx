import { Mail, MapPin, Phone } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import { getProfile } from "@/lib/data";

export const metadata = {
  title: "Contact | Adhitama Wichaksono",
  description: "Get in touch for collaborations, opportunities, or inquiries.",
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="mx-auto max-w-[1100px] px-8 py-20">
      <SectionHeader
        label="Contact"
        title="Let's work together"
        description="Have a project in mind or just want to say hi? Reach out!"
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="font-display mb-4 text-lg font-semibold">Get in touch</h3>
          <p className="mb-8 text-[0.9rem] text-[var(--text-secondary)]">
            Based in Jakarta, Indonesia — available for remote or on-site opportunities.
          </p>

          <ul className="space-y-5">
            {profile.email && (
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[var(--primary)]" />
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[0.9rem] text-[var(--text-secondary)] hover:text-[var(--primary)]"
                >
                  {profile.email}
                </a>
              </li>
            )}
            {profile.phone && (
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[var(--primary)]" />
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="text-[0.9rem] text-[var(--text-secondary)] hover:text-[var(--primary)]"
                >
                  {profile.phone}
                </a>
              </li>
            )}
            {profile.location && (
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-[var(--primary)]" />
                <span className="text-[0.9rem] text-[var(--text-secondary)]">
                  {profile.location}
                </span>
              </li>
            )}
          </ul>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
