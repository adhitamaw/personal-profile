"use client";

import { useEffect, useState } from "react";
import { Save, CheckCircle, AlertCircle } from "lucide-react";
import { AdminInput, AdminTextarea } from "@/components/admin/AdminFormField";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { seedProfile } from "@/lib/seed-data";
import type { Profile } from "@/lib/types";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile>(seedProfile);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured()) return;
      const supabase = createClient();
      const { data } = await supabase.from("profile").select("*").limit(1).single();
      if (data) setProfile(data);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    if (!isSupabaseConfigured()) {
      setMessage("Supabase belum dikonfigurasi. Data hanya tersimpan di demo mode.");
      setStatus("error");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("profile")
      .upsert({ ...profile, updated_at: new Date().toISOString() });

    if (error) {
      setMessage(error.message);
      setStatus("error");
      return;
    }

    setMessage("Profile berhasil disimpan!");
    setStatus("success");
  }

  function update(field: keyof Profile, value: string) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Edit Profile</h1>
      <p className="mb-8 text-muted">Update informasi personal dan kontak.</p>

      <form onSubmit={handleSave} className="max-w-2xl space-y-5">
        <AdminInput
          label="Name"
          id="name"
          value={profile.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
        <AdminInput
          label="Title"
          id="title"
          value={profile.title}
          onChange={(e) => update("title", e.target.value)}
          required
        />
        <AdminTextarea
          label="Bio"
          id="bio"
          rows={4}
          value={profile.bio}
          onChange={(e) => update("bio", e.target.value)}
          required
        />
        <div className="grid gap-5 md:grid-cols-2">
          <AdminInput
            label="Location"
            id="location"
            value={profile.location ?? ""}
            onChange={(e) => update("location", e.target.value)}
          />
          <AdminInput
            label="Email"
            id="email"
            type="email"
            value={profile.email ?? ""}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <AdminInput
            label="LinkedIn URL"
            id="linkedin"
            value={profile.linkedin_url ?? ""}
            onChange={(e) => update("linkedin_url", e.target.value)}
          />
          <AdminInput
            label="GitHub URL"
            id="github"
            value={profile.github_url ?? ""}
            onChange={(e) => update("github_url", e.target.value)}
          />
        </div>
        <AdminInput
          label="CV URL"
          id="cv"
          value={profile.cv_url ?? ""}
          onChange={(e) => update("cv_url", e.target.value)}
        />

        {status === "success" && (
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircle size={16} /> {message}
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle size={16} /> {message}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          <Save size={16} />
          {status === "loading" ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
