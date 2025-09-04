"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useNotes } from "@/hooks/useNotes";
import { apiGetNote } from "@/lib/api";
import NoteEditor from "@/components/NoteEditor";
import { Note } from "@/lib/types";

export default function EditNotePage() {
  const params = useParams();
  const id = useMemo(() => (typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params?.id[0] : ""), [params]);
  const { user, loading } = useAuth();
  const { updateNote, deleteNote } = useNotes();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loadingNote, setLoadingNote] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const res = await apiGetNote(id);
      if (!mounted) return;
      setNote(res.data || null);
      setLoadingNote(false);
    }
    if (id) load();
    return () => { mounted = false; };
  }, [id]);

  async function handleSave(input: { title: string; content: string; category?: string; tags?: string[] }) {
    if (!id) return;
    const res = await updateNote(id, input);
    if (res.ok) router.replace("/notes");
  }

  async function handleDelete() {
    if (!id) return;
    const res = await deleteNote(id);
    if (res.ok) router.replace("/notes");
  }

  return (
    <div className="app-body">
      <aside className="sidebar">
        <div className="sidebar-title">Edit</div>
        <p className="small">Modify your note and save changes.</p>
      </aside>
      <main className="content">
        {loadingNote ? (
          <div className="card note-card">Loading…</div>
        ) : !note ? (
          <div className="card note-card">Note not found.</div>
        ) : (
          <NoteEditor
            initial={note}
            onSubmit={handleSave}
            onDelete={handleDelete}
            submitLabel="Save changes"
          />
        )}
      </main>
    </div>
  );
}
