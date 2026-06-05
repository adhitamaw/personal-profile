"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, X as XIcon } from "lucide-react";
import { AdminInput } from "@/components/admin/AdminFormField";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { seedSkillGroups } from "@/lib/seed-data";
import type { SkillGroup } from "@/lib/types";

export default function AdminSkillsPage() {
  const [groups, setGroups] = useState<SkillGroup[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [newSkillNames, setNewSkillNames] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!isSupabaseConfigured()) {
      setGroups(seedSkillGroups);
      return;
    }
    const supabase = createClient();
    const { data: groupData } = await supabase
      .from("skill_groups")
      .select("*")
      .order("sort_order");
    const { data: skillData } = await supabase
      .from("skills")
      .select("*")
      .order("sort_order");

    if (groupData) {
      setGroups(
        groupData.map((g) => ({
          ...g,
          skills: (skillData ?? []).filter((s) => s.group_id === g.id),
        }))
      );
    }
  }

  async function addGroup() {
    if (!newGroupName.trim()) return;
    if (!isSupabaseConfigured()) {
      setGroups((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          name: newGroupName,
          icon: "code",
          sort_order: prev.length + 1,
          skills: [],
        },
      ]);
      setNewGroupName("");
      return;
    }
    const supabase = createClient();
    await supabase.from("skill_groups").insert({
      name: newGroupName,
      icon: "code",
      sort_order: groups.length + 1,
    });
    setNewGroupName("");
    loadData();
  }

  async function addSkill(groupId: string) {
    const name = newSkillNames[groupId]?.trim();
    if (!name) return;

    if (!isSupabaseConfigured()) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupId
            ? {
                ...g,
                skills: [
                  ...g.skills,
                  {
                    id: `local-s-${Date.now()}`,
                    group_id: groupId,
                    name,
                    sort_order: g.skills.length + 1,
                  },
                ],
              }
            : g
        )
      );
      setNewSkillNames((prev) => ({ ...prev, [groupId]: "" }));
      return;
    }

    const supabase = createClient();
    const group = groups.find((g) => g.id === groupId);
    await supabase.from("skills").insert({
      group_id: groupId,
      name,
      sort_order: (group?.skills.length ?? 0) + 1,
    });
    setNewSkillNames((prev) => ({ ...prev, [groupId]: "" }));
    loadData();
  }

  async function deleteGroup(id: string) {
    if (!confirm("Hapus skill group dan semua skill di dalamnya?")) return;
    if (!isSupabaseConfigured()) {
      setGroups((prev) => prev.filter((g) => g.id !== id));
      return;
    }
    const supabase = createClient();
    await supabase.from("skill_groups").delete().eq("id", id);
    loadData();
  }

  async function deleteSkill(id: string) {
    if (!isSupabaseConfigured()) {
      setGroups((prev) =>
        prev.map((g) => ({
          ...g,
          skills: g.skills.filter((s) => s.id !== id),
        }))
      );
      return;
    }
    const supabase = createClient();
    await supabase.from("skills").delete().eq("id", id);
    loadData();
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Skills</h1>
      <p className="mb-8 text-muted">Kelola grup skill dan daftar keahlian.</p>

      <div className="glass-card mb-8 flex gap-3 rounded-2xl p-4">
        <AdminInput
          label=""
          id="new-group"
          placeholder="Nama skill group baru..."
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="flex-1"
        />
        <button
          type="button"
          onClick={addGroup}
          className="mt-auto inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus size={16} /> Add Group
        </button>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.id} className="glass-card rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">{group.name}</h3>
              <button
                type="button"
                onClick={() => deleteGroup(group.id)}
                className="text-muted hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1 rounded-lg border border-card-border px-3 py-1.5 text-sm"
                >
                  {skill.name}
                  <button
                    type="button"
                    onClick={() => deleteSkill(skill.id)}
                    className="text-muted hover:text-red-400"
                  >
                    <XIcon size={12} />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                placeholder="Tambah skill..."
                value={newSkillNames[group.id] ?? ""}
                onChange={(e) =>
                  setNewSkillNames((prev) => ({
                    ...prev,
                    [group.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) => e.key === "Enter" && addSkill(group.id)}
                className="flex-1 rounded-xl border border-card-border bg-background px-4 py-2 text-sm outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={() => addSkill(group.id)}
                className="rounded-xl bg-accent/10 px-4 py-2 text-sm text-accent hover:bg-accent/20"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
