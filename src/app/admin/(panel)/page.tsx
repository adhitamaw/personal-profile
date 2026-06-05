import Link from "next/link";
import {
  User,
  Briefcase,
  FolderKanban,
  Sparkles,
  Mail,
  ArrowRight,
} from "lucide-react";
import {
  getProfile,
  getExperiences,
  getProjects,
  getSkillGroups,
  getContactMessages,
} from "@/lib/data";

const cards = [
  { href: "/admin/profile", label: "Profile", icon: User, color: "text-cyan-400" },
  { href: "/admin/experience", label: "Experience", icon: Briefcase, color: "text-violet-400" },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban, color: "text-amber-400" },
  { href: "/admin/skills", label: "Skills", icon: Sparkles, color: "text-emerald-400" },
  { href: "/admin/messages", label: "Messages", icon: Mail, color: "text-rose-400" },
];

export default async function AdminDashboard() {
  const [profile, experiences, projects, skillGroups, messages] =
    await Promise.all([
      getProfile(),
      getExperiences(),
      getProjects(),
      getSkillGroups(),
      getContactMessages(),
    ]);

  const unreadMessages = messages.filter((m) => !m.read).length;
  const totalSkills = skillGroups.reduce((a, g) => a + g.skills.length, 0);

  const stats = [
    { label: "Experiences", value: experiences.length },
    { label: "Projects", value: projects.length },
    { label: "Skills", value: totalSkills },
    { label: "Unread Messages", value: unreadMessages },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted">
          Welcome back! Manage content for {profile.name}&apos;s portfolio.
        </p>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-5">
            <p className="text-3xl font-bold text-accent">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="glass-card group flex items-center justify-between rounded-2xl p-5 transition-all hover:border-accent/30"
          >
            <div className="flex items-center gap-3">
              <card.icon className={card.color} size={22} />
              <span className="font-medium">{card.label}</span>
            </div>
            <ArrowRight
              size={16}
              className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
