"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { AdminInput, AdminTextarea, AdminSelect } from "@/components/admin/AdminFormField";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { seedExperiences } from "@/lib/seed-data";
import type { Experience, ExperienceCategory } from "@/lib/types";

const emptyExp: Omit<Experience, "id"> = {
  category: "work",
  title: "",
  organization: "",
  location: "",
  period_start: "",
  period_end: "",
  description: "",
  highlights: [],
  sort_order: 0,
};

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Partial<Experience> | null>(null);
  const [highlightsText, setHighlightsText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!isSupabaseConfigured()) {
      setItems(seedExperiences);
      return;
    }
    const supabase = createClient();
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .order("sort_order");
    setItems(data ?? seedExperiences);
  }

  function startEdit(item?: Experience) {
    if (item) {
      setEditing(item);
      setHighlightsText(item.highlights.join("\n"));
    } else {
      setEditing({ ...emptyExp });
      setHighlightsText("");
    }
  }

  async function handleSave() {
    if (!editing) return;
    const payload = {
      ...editing,
      highlights: highlightsText.split("\n").filter(Boolean),
      location: editing.location || null,
      period_start: editing.period_start || null,
      period_end: editing.period_end || null,
      description: editing.description || null,
    };

    if (!isSupabaseConfigured()) {
      if (editing.id) {
        setItems((prev) =>
          prev.map((i) => (i.id === editing.id ? { ...i, ...payload } as Experience : i))
        );
      } else {
        setItems((prev) => [
          ...prev,
          { ...payload, id: `local-${Date.now()}` } as Experience,
        ]);
      }
      setEditing(null);
      return;
    }

    const supabase = createClient();
    if (editing.id && !editing.id.startsWith("local-") && !editing.id.startsWith("exp-")) {
      await supabase.from("experiences").update(payload).eq("id", editing.id);
    } else if (!editing.id || editing.id.startsWith("local-") || editing.id.startsWith("exp-")) {
      const { id: _id, ...rest } = payload as Experience;
      await supabase.from("experiences").insert(rest);
    }
    setEditing(null);
    loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus experience ini?")) return;
    if (!isSupabaseConfigured()) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    const supabase = createClient();
    await supabase.from("experiences").delete().eq("id", id);
    loadData();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Experience</h1>
          <p className="text-muted">Kelola pengalaman kerja, pendidikan, dan sertifikasi.</p>
        </div>
        <button
          type="button"
          onClick={() => startEdit()}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {editing && (
        <div className="glass-card mb-8 rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">
              {editing.id ? "Edit" : "Add"} Experience
            </h2>
            <button type="button" onClick={() => setEditing(null)}>
              <X size={18} className="text-muted" />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminSelect
              label="Category"
              id="category"
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value as ExperienceCategory })
              }
            >
              <option value="work">Work</option>
              <option value="education">Education</option>
              <option value="leadership">Leadership</option>
              <option value="certification">Certification</option>
              <option value="publication">Publication</option>
            </AdminSelect>
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
              label="Title"
              id="title"
              value={editing.title ?? ""}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
            <AdminInput
              label="Organization"
              id="org"
              value={editing.organization ?? ""}
              onChange={(e) => setEditing({ ...editing, organization: e.target.value })}
            />
            <AdminInput
              label="Location"
              id="loc"
              value={editing.location ?? ""}
              onChange={(e) => setEditing({ ...editing, location: e.target.value })}
            />
            <AdminInput
              label="Period Start"
              id="start"
              value={editing.period_start ?? ""}
              onChange={(e) => setEditing({ ...editing, period_start: e.target.value })}
            />
            <AdminInput
              label="Period End"
              id="end"
              value={editing.period_end ?? ""}
              onChange={(e) => setEditing({ ...editing, period_end: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <AdminTextarea
              label="Description"
              id="desc"
              rows={2}
              value={editing.description ?? ""}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <AdminTextarea
              label="Highlights (one per line)"
              id="highlights"
              rows={4}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
            />
          </div>
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
            className="glass-card flex items-center justify-between rounded-xl p-4"
          >
            <div>
              <span className="mr-2 rounded bg-accent/10 px-2 py-0.5 text-xs text-accent">
                {item.category}
              </span>
              <span className="font-medium">{item.title}</span>
              <span className="ml-2 text-sm text-muted">@ {item.organization}</span>
            </div>
            <div className="flex gap-2">
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
