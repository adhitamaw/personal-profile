import { assetUrl } from "@/lib/assets";
import type { Profile } from "@/lib/types";

export default function DataProfileCard({ profile }: { profile: Profile }) {
  const nameParts = profile.name.split(" ");

  return (
    <div className="editorial-card mx-auto w-full max-w-[340px] overflow-hidden font-mono-label text-[0.75rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(200,92,64,0.08)]">
      <div className="flex items-center gap-2 border-b border-[var(--border-light)] bg-[var(--bg-secondary)] px-4 py-2.5 text-[0.65rem] uppercase tracking-wider text-[var(--text-muted)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)]" />
        SYS_PROFILE_01
      </div>

      <div className="flex aspect-square items-center justify-center bg-[var(--bg-secondary)]">
        {profile.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={assetUrl(profile.avatar_url)}
            alt={profile.name}
            className="h-full w-full object-cover grayscale-[30%] contrast-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--border-light)]">
            <span className="font-display text-5xl font-bold italic text-[var(--primary)]">
              {nameParts[0]?.[0]}
              {nameParts[1]?.[0]}
            </span>
          </div>
        )}
      </div>

      <div className="border-t border-[var(--border-light)] px-4 py-3">
        <p className="mb-2 font-display text-sm font-semibold text-[var(--text)]">
          {profile.name}
        </p>
        {[
          { label: "LOCATION", value: profile.location ?? "Jakarta, ID" },
          { label: "ROLES", value: "Data & Backend" },
          { label: "EDUCATION", value: "Telkom Univ" },
          { label: "GPA", value: "3.34/4.00" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex justify-between border-b border-[var(--border-light)] py-1.5 last:border-0"
          >
            <span className="text-[0.6rem] tracking-wider text-[var(--text-muted)]">
              {row.label}
            </span>
            <span className="font-[family-name:var(--font-body)] text-[0.8rem] font-medium text-[var(--text)]">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
