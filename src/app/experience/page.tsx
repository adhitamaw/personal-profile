import { GraduationCap, Award } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { getExperiences } from "@/lib/data";

export const metadata = {
  title: "Experience | Adhitama Wichaksono",
  description: "Career timeline, education, certifications, and publications.",
};

export default async function ExperiencePage() {
  const allExperiences = await getExperiences();
  const work = allExperiences.filter((e) => e.category === "work");
  const education = allExperiences.filter((e) => e.category === "education");
  const certifications = allExperiences.filter((e) => e.category === "certification");

  return (
    <div className="mx-auto max-w-[1100px] px-8 py-20">
      <SectionHeader
        label="Experience"
        title="Career timeline"
        description="Professional journey in data analytics, backend development, and AI integration."
      />
      <ExperienceTimeline items={work} />

      {education.length > 0 && (
        <div className="mt-20">
          <SectionHeader label="Education" title="Academic background" />
          {education.map((edu) => (
            <div key={edu.id} className="editorial-card flex gap-6 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--primary-light)] text-[var(--primary)]">
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{edu.title}</h3>
                <p className="text-[0.9rem] text-[var(--text-secondary)]">
                  {edu.organization}
                </p>
                <p className="mt-1 font-mono-label text-[0.7rem] text-[var(--primary)]">
                  {edu.period_start} — {edu.period_end}
                  {edu.description && ` · ${edu.description}`}
                </p>
                {edu.highlights.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {edu.highlights.map((tag) => (
                      <span key={tag} className="skill-item text-[0.65rem]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mt-20">
          <SectionHeader
            label="Certifications"
            title="Professional Credentials"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="editorial-card flex items-start gap-4 p-5 hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--secondary-light)] text-[var(--secondary)]">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold">{cert.title}</h4>
                  <p className="text-[0.82rem] text-[var(--text-secondary)]">
                    {cert.organization}
                  </p>
                  <p className="mt-1 font-mono-label text-[0.65rem] text-[var(--text-muted)]">
                    {cert.period_start}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
