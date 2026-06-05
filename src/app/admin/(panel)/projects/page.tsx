"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save, Star } from "lucide-react";
import { AdminInput, AdminTextarea } from "@/components/admin/AdminFormField";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { seedProjects } from "@/lib/seed-data";
import type { Project } from "@/lib/types";

const emptyProject: Omit<Project, "id"> = {
  title: "",
  subtitle: "",
  description: "",
  tags: [],
  year: "",
  project_url: "",
  doc_url: "",
  image_url: "",
  featured: false,
  sort_order: 0,
};

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [tagsText, setTagsText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!isSupabaseConfigured()) {
      setItems(seedProjects);
      return;
    }
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order");
    setItems(data ?? seedProjects);
  }

  function startEdit(item?: Project) {
    if (item) {
      setEditing(item);
      setTagsText(item.tags.join(", "));
    } else {
      setEditing({ ...emptyProject });
      setTagsText("");
    }
  }

  async function handleSave() {
    if (!editing) return;
    const payload = {
      ...editing,
      tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
      subtitle: editing.subtitle || null,
      year: editing.year || null,
      project_url: editing.project_url || null,
      doc_url: editing.doc_url || null,
      image_url: editing.image_url || null,
    };

    if (!isSupabaseConfigured()) {
      if (editing.id) {
        setItems((prev) =>
          prev.map((i) => (i.id === editing.id ? { ...i, ...payload } as Project : i))
        );
      } else {
        setItems((prev) => [
          ...prev,
          { ...payload, id: `local-${Date.now()}` } as Project,
        ]);
      }
      setEditing(null);
      return;
    }

    const supabase = createClient();
    if (editing.id && !editing.id.startsWith("local-") && !editing.id.startsWith("proj-")) {
      await supabase.from("projects").update(payload).eq("id", editing.id);
    } else {
      const { id: _id, ...rest } = payload as Project;
      await supabase.from("projects").insert(rest);
    }
    setEditing(null);
    loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus project ini?")) return;
    if (!isSupabaseConfigured()) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    const supabase = createClient();
    await supabase.from("projects").delete().eq("id", id);
    loadData();
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted">Kelola portofolio dan proyek.</p>
        </div>
        <button
          type="button"
          onClick={() => startEdit()}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white sm:self-auto"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {editing && (
        <div className="glass-card mb-8 rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">{editing.id ? "Edit" : "Add"} Project</h2>
            <button type="button" onClick={() => setEditing(null)}>
              <X size={18} className="text-muted" />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput
              label="Title"
              id="title"
              value={editing.title ?? ""}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
            <AdminInput
              label="Subtitle"
              id="subtitle"
              value={editing.subtitle ?? ""}
              onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
            />
            <AdminInput
              label="Year"
              id="year"
              value={editing.year ?? ""}
              onChange={(e) => setEditing({ ...editing, year: e.target.value })}
            />
            <AdminInput
              label="Sort Order"
              id="sort"
              type="number"
              value={editing.sort_order ?? 0}
              onChange={(e) =>
                setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })
              }
            />
            <AdminInput
              label="Project URL"
              id="url"
              value={editing.project_url ?? ""}
              onChange={(e) => setEditing({ ...editing, project_url: e.target.value })}
            />
            <AdminInput
              label="Documentation URL"
              id="doc"
              value={editing.doc_url ?? ""}
              onChange={(e) => setEditing({ ...editing, doc_url: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <AdminTextarea
              label="Description"
              id="desc"
              rows={3}
              value={editing.description ?? ""}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <AdminInput
              label="Tags (comma separated)"
              id="tags"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
            />
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={editing.featured ?? false}
              onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
              className="rounded"
            />
            Featured project
          </label>
          <button
            type="button"
            onClick={handleSave}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white"
          >
            <Save size={16} /> Save
          </button>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="glass-card flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-center gap-2">
              {item.featured && <Star size={14} className="shrink-0 text-amber-400" fill="currentColor" />}
              <span className="font-medium">{item.title}</span>
              {item.year && (
                <span className="shrink-0 text-sm text-muted">({item.year})</span>
              )}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => startEdit(item)}
                className="rounded-lg p-2 text-muted hover:bg-accent/10 hover:text-accent"
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="rounded-lg p-2 text-muted hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
