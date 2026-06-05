"use client";

import { useState } from "react";
import { LayoutGrid, Table2 } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { assetUrl } from "@/lib/assets";
import type { Project } from "@/lib/types";

function getProjectType(project: Project): "analyst" | "backend" {
  const analystKeywords = ["Power BI", "Excel", "Data Analytics", "Data Analysis", "Visualization"];
  return project.tags.some((t) => analystKeywords.some((k) => t.includes(k)))
    ? "analyst"
    : "backend";
}

function getImpactMetric(project: Project): string {
  const metrics: Record<string, string> = {
    "proj-1": "Target achievement analysis dashboard at TAM",
    "proj-2": "Drill-down tracking across regions & periods",
    "proj-3": "Inventory & production optimization recommendations",
    "proj-4": "99.09% DQN intrusion detection accuracy (IEEE)",
    "proj-5": "RESTful API backend for trip admin (BP Batam)",
    "proj-6": "REST backend with priority & deadline management",
    "proj-7": "REST API integrating translation & chat models",
  };
  return metrics[project.id] ?? project.description.slice(0, 80) + "...";
}

export default function ProjectsView({
  featured,
  others,
}: {
  featured: Project[];
  others: Project[];
}) {
  const [view, setView] = useState<"grid" | "table">("grid");
  const allProjects = [...featured, ...others];

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <div className="flex gap-1 rounded-[var(--radius-sm)] border border-[var(--border-light)] bg-[var(--bg-secondary)] p-1">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 font-mono-label text-[0.65rem] uppercase tracking-wide transition-all ${
              view === "grid"
                ? "bg-[var(--bg-card)] text-[var(--text)] shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            <LayoutGrid size={12} />
            Grid View
          </button>
          <button
            type="button"
            onClick={() => setView("table")}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 font-mono-label text-[0.65rem] uppercase tracking-wide transition-all ${
              view === "table"
                ? "bg-[var(--bg-card)] text-[var(--text)] shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            <Table2 size={12} />
            Spreadsheet View
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {others.length > 0 && (
            <div className="mt-6 border-t border-[var(--border-light)] pt-6">
              <h3 className="font-display mb-1 text-lg font-semibold">Notable projects</h3>
              <p className="mb-4 text-[0.85rem] text-[var(--text-secondary)]">
                Other independent work, utility apps, and academic contributions.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {others.map((project) => (
                  <article
                    key={project.id}
                    className="editorial-card p-5 hover:-translate-y-1"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-display text-sm font-semibold">
                        {project.title}
                      </h4>
                      {project.year && (
                        <span className="font-mono-label text-[0.6rem] text-[var(--text-muted)]">
                          {project.year}
                        </span>
                      )}
                    </div>
                    {project.subtitle && (
                      <p className="mb-2 font-mono-label text-[0.6rem] text-[var(--text-muted)]">
                        {project.subtitle.split("|")[0]?.trim()}
                      </p>
                    )}
                    <p className="mb-3 text-[0.82rem] text-[var(--text-secondary)]">
                      {project.description}
                    </p>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="skill-item text-[0.6rem]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono-label text-[0.65rem] text-[var(--text-muted)] hover:text-[var(--primary)]"
                      >
                        GitHub →
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="editorial-card overflow-hidden">
          <table className="w-full border-collapse text-[0.8rem]">
            <thead className="border-b-2 border-[var(--border)] bg-[var(--bg-secondary)]">
              <tr>
                {["Project Name", "Type", "Tech Stack", "Impact Metric", "Links"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-mono-label text-[0.6rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {allProjects.map((project) => {
                const type = getProjectType(project);
                return (
                  <tr
                    key={project.id}
                    className="border-b border-[var(--border-light)] transition-colors last:border-0 hover:bg-[var(--bg-secondary)]"
                  >
                    <td className="px-4 py-3 font-display text-[0.85rem] font-semibold">
                      {project.title}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          type === "analyst" ? "badge-analyst" : "badge-backend"
                        }
                      >
                        {type === "analyst" ? "Data Analyst" : "Backend"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono-label text-[0.7rem] text-[var(--text-secondary)]">
                      {project.tags.slice(0, 4).join(", ")}
                    </td>
                    <td className="px-4 py-3 text-[0.78rem] text-[var(--text-secondary)]">
                      {getImpactMetric(project)}
                    </td>
                    <td className="px-4 py-3">
                      {project.doc_url && (
                        <a
                          href={assetUrl(project.doc_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mr-2 font-mono-label text-[0.65rem] text-[var(--text-muted)] hover:text-[var(--primary)]"
                        >
                          PDF
                        </a>
                      )}
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono-label text-[0.65rem] text-[var(--text-muted)] hover:text-[var(--primary)]"
                        >
                          Git
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
