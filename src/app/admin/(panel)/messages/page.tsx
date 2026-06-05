"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { ContactMessage } from "@/lib/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!isSupabaseConfigured()) {
      setMessages([]);
      return;
    }
    const supabase = createClient();
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data ?? []);
  }

  async function markRead(id: string) {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    await supabase.from("contact_messages").update({ read: true }).eq("id", id);
    loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus pesan ini?")) return;
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    await supabase.from("contact_messages").delete().eq("id", id);
    if (selected?.id === id) setSelected(null);
    loadData();
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Messages</h1>
      <p className="mb-8 text-muted">Pesan dari form kontak website.</p>

      {!isSupabaseConfigured() ? (
        <div className="glass-card rounded-2xl p-8 text-center text-muted">
          <Mail size={32} className="mx-auto mb-4 text-accent" />
          <p>Hubungkan Supabase untuk menerima dan mengelola pesan kontak.</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center text-muted">
          Belum ada pesan masuk.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                type="button"
                onClick={() => {
                  setSelected(msg);
                  if (!msg.read) markRead(msg.id);
                }}
                className={`glass-card w-full rounded-xl p-4 text-left transition-all hover:border-accent/30 ${
                  selected?.id === msg.id ? "border-accent/50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {msg.read ? (
                      <MailOpen size={16} className="text-muted" />
                    ) : (
                      <Mail size={16} className="text-accent" />
                    )}
                    <span className={`font-medium ${!msg.read ? "text-foreground" : "text-muted"}`}>
                      {msg.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted">
                    {new Date(msg.created_at).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-muted">
                  {msg.subject || msg.message}
                </p>
              </button>
            ))}
          </div>

          {selected && (
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{selected.name}</h3>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-sm text-accent hover:underline"
                  >
                    {selected.email}
                  </a>
                  {selected.subject && (
                    <p className="mt-2 text-sm font-medium">{selected.subject}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(selected.id)}
                  className="text-muted hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted">
                {selected.message}
              </p>
              <p className="mt-4 text-xs text-muted">
                {new Date(selected.created_at).toLocaleString("id-ID")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
