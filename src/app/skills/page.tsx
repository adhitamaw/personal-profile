import SectionHeader from "@/components/SectionHeader";
import SkillPipeline from "@/components/SkillPipeline";
import { assetUrl } from "@/lib/assets";
import { getProfile, getSkillGroups } from "@/lib/data";

export const metadata = {
  title: "About | Adhitama Wichaksono",
  description:
    "Data Analyst & Backend Developer with expertise in Python, SQL, Power BI, and backend engineering.",
};

const aboutSkills = [
  "Python", "SQL", "Golang", "PHP", "Power BI", "Laravel",
  "Excel", "EDA", "ML", "TypeScript",
];

export default async function SkillsPage() {
  const [profile, skillGroups] = await Promise.all([
    getProfile(),
    getSkillGroups(),
  ]);

  const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => s.name));

  return (
    <div className="mx-auto max-w-[1100px] px-8 py-20">
      <SectionHeader
        label="About Me"
        title="Data Analyst & Backend Developer"
      />

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.5fr]">
        <div className="space-y-4">
          {profile.avatar_url && (
            <div className="editorial-card overflow-hidden p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetUrl(profile.avatar_url)}
                alt={profile.name}
                className="w-full rounded-[calc(var(--radius)-4px)] object-cover grayscale-[30%] contrast-[1.05]"
              />
            </div>
          )}
          <div className="editorial-card overflow-hidden p-2">
            <SkillPipeline />
          </div>
        </div>

        <div>
          <p className="mb-4 text-[0.92rem] leading-[1.8] text-[var(--text-secondary)]">
            Fresh graduate in Informatics from Telkom University (GPA 3.34) with a
            strong interest and hands-on experience in Data Analysis, Data Engineering,
            Backend Development, and Web Development.
          </p>
          <p className="mb-4 text-[0.92rem] leading-[1.8] text-[var(--text-secondary)]">
            Experienced as an intern at Toyota Astra Motor and BP Batam, and participated
            in the Kampus Merdeka program (MSIB 6). Proficient in Python, SQL, Power BI,
            Go, PHP, Laravel, with strong skills in data cleaning, exploratory data
            analysis (EDA), and data visualization.
          </p>
          <p className="mb-6 text-[0.92rem] leading-[1.8] text-[var(--text-secondary)]">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-2">
            {(aboutSkills.length > 0 ? aboutSkills : allSkills).map((skill) => (
              <span key={skill} className="skill-item">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <SectionHeader
          label="Skills"
          title="Skills & Expertise"
          description={`${allSkills.length} skills across ${skillGroups.length} domains.`}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.id} className="editorial-card p-6">
              <h3 className="font-display mb-4 text-base font-semibold">
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill.id} className="skill-item">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
