import type { Experience } from "@/lib/types";

export default function ExperienceTimeline({
  items,
}: {
  items: Experience[];
}) {
  return (
    <div className="timeline relative pl-8">
      {items.map((exp) => {
        const period = [exp.period_start, exp.period_end]
          .filter(Boolean)
          .join(" — ");
        const summary =
          exp.highlights[0] ??
          exp.description ??
          "";

        return (
          <div key={exp.id} className="relative pb-10 pl-6 last:pb-0">
            <div className="timeline-dot" />
            <p className="mb-1 font-mono-label text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--primary)]">
              {period}
            </p>
            <h3 className="font-display mb-1 text-lg font-semibold">{exp.title}</h3>
            <p className="mb-2 text-[0.85rem] font-medium text-[var(--text-secondary)]">
              {exp.organization}
              {exp.location && ` — ${exp.location}`}
            </p>
            <p className="text-[0.85rem] leading-relaxed text-[var(--text-secondary)]">
              {summary}
            </p>
            {exp.highlights.length > 1 && (
              <ul className="mt-2 space-y-1">
                {exp.highlights.slice(1).map((h, i) => (
                  <li
                    key={i}
                    className="text-[0.82rem] text-[var(--text-secondary)] before:mr-2 before:text-[var(--primary)] before:content-['•']"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
