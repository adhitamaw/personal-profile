import {
  seedExperiences,
  seedProfile,
  seedProjects,
  seedSkillGroups,
} from "./seed-data";
import { createClient } from "./supabase/server";
import type {
  ContactMessage,
  Experience,
  ExperienceCategory,
  Profile,
  Project,
  SkillGroup,
} from "./types";

function isConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getProfile(): Promise<Profile> {
  if (!isConfigured()) return seedProfile;

  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").limit(1).single();
  return data ?? seedProfile;
}

export async function getExperiences(
  category?: ExperienceCategory
): Promise<Experience[]> {
  if (!isConfigured()) {
    return category
      ? seedExperiences.filter((e) => e.category === category)
      : seedExperiences;
  }

  const supabase = await createClient();
  let query = supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });

  if (category) query = query.eq("category", category);

  const { data } = await query;
  return (data as Experience[]) ?? seedExperiences;
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  if (!isConfigured()) return seedSkillGroups;

  const supabase = await createClient();
  const { data: groups } = await supabase
    .from("skill_groups")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!groups) return seedSkillGroups;

  return groups.map((group) => ({
    ...group,
    skills: (skills ?? []).filter((s) => s.group_id === group.id),
  }));
}

export async function getProjects(featuredOnly = false): Promise<Project[]> {
  if (!isConfigured()) {
    return featuredOnly
      ? seedProjects.filter((p) => p.featured)
      : seedProjects;
  }

  const supabase = await createClient();
  let query = supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (featuredOnly) query = query.eq("featured", true);

  const { data } = await query;
  return (data as Project[]) ?? seedProjects;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (!isConfigured()) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (data as ContactMessage[]) ?? [];
}
