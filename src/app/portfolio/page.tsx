import SectionHeader from "@/components/SectionHeader";
import ProjectsView from "@/components/ProjectsView";
import { getProjects } from "@/lib/data";

export const metadata = {
  title: "Projects | Adhitama Wichaksono",
  description: "Projects in data analytics, Power BI, machine learning, and backend development.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-[1100px] px-8 py-20">
      <SectionHeader
        label="Portfolio"
        title="Featured projects"
        description="A selection of projects from internships, research, and independent work."
      />
      <ProjectsView featured={featured} others={others} />
    </div>
  );
}
