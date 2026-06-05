import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import DataProfileCard from "@/components/DataProfileCard";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { assetUrl } from "@/lib/assets";
import { getProfile, getExperiences, getProjects } from "@/lib/data";

export default async function HomePage() {
  const [profile, workExp, projects] = await Promise.all([
    getProfile(),
    getExperiences("work"),
    getProjects(true),
  ]);

  const nameParts = profile.name.split(" ");

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col justify-center px-8 pb-12 pt-28">
        <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.9fr]">
          <div className="flex flex-col items-start">
            <div className="mb-6 inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border-light)] px-3 py-1 font-mono-label text-[0.65rem] uppercase tracking-[2px] text-[var(--secondary)]">
              <span className="h-1 w-1 rounded-full bg-[var(--secondary)]" />
              Open to opportunities
            </div>

            <h1 className="font-display text-[clamp(2.5rem,6vw,4.2rem)] font-bold leading-[1.05] tracking-[-1.5px]">
              {nameParts[0]}{" "}
              <span className="italic text-[var(--primary)]">
                {nameParts.slice(1).join(" ")}
              </span>
            </h1>

            <p className="mt-4 max-w-[480px] text-base leading-relaxed text-[var(--text-secondary)]">
              Data Analyst & Backend Developer. Passionate about Data Engineering,
              Machine Learning, and building impactful web solutions.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/portfolio" className="btn btn-primary">
                View My Work
                <ArrowRight size={16} />
              </Link>
              {profile.cv_url ? (
                <a
                  href={assetUrl(profile.cv_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <Download size={16} />
                  Download CV
                </a>
              ) : (
                <Link href="/contact" className="btn btn-outline">
                  Get in Touch
                </Link>
              )}
            </div>
          </div>

          <DataProfileCard profile={profile} />
        </div>

        {/* Metrics bar */}
        <div className="mx-auto mt-12 flex w-full max-w-[800px] flex-wrap items-center justify-center gap-8 border-y border-[var(--border-light)] px-8 py-5">
          {[
            { num: "99.09%", label: "Research ML Accuracy" },
            { num: "45s → 10s", label: "TAM Dashboard Speedup" },
            { num: "3+ Years", label: "Tech Exploration" },
          ].map((m, i) => (
            <div key={m.label} className="flex items-center gap-8">
              {i > 0 && (
                <div className="hidden h-8 w-px bg-[var(--border)] sm:block" />
              )}
              <div className="flex flex-col items-center gap-1">
                <span className="font-mono-label text-[1.1rem] font-bold text-[var(--primary)]">
                  {m.num}
                </span>
                <span className="text-center font-mono-label text-[0.65rem] uppercase tracking-wider text-[var(--text-muted)]">
                  {m.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[0.6rem] uppercase tracking-[2px] text-[var(--text-muted)] opacity-60">
          Scroll to explore
          <div className="scroll-line" />
        </div>
      </section>

      {/* Preview sections */}
      <section className="mx-auto max-w-[1100px] px-8 py-20">
        <SectionHeader
          label="Portfolio"
          title="Featured projects"
          description="A selection of projects from internships, research, and independent work."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-mono-label text-[0.75rem] text-[var(--primary)] hover:underline"
          >
            View all projects <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-8 py-20">
        <SectionHeader
          label="Experience"
          title="Career timeline"
          description="Professional journey across data analytics, backend development, and AI integration."
        />
        <ExperienceTimeline items={workExp} />
        <div className="mt-8">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 font-mono-label text-[0.75rem] text-[var(--primary)] hover:underline"
          >
            Full experience <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-8 py-20">
        <div className="editorial-card rounded-[var(--radius)] p-10 text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Let&apos;s work together
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[var(--text-secondary)]">
            Have a project in mind or just want to say hi? Reach out!
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">
            Contact Me <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
