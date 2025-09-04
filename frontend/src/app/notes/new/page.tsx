"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useNotes } from "@/hooks/useNotes";
import NoteEditor from "@/components/NoteEditor";
import { NoteInput } from "@/lib/types";
import { useEffect } from "react";

export default function NewNotePage() {
  const { user, loading } = useAuth();
  const { createNote } = useNotes();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  async function handleCreate(input: NoteInput) {
    const res = await createNote(input);
    if (res.ok && res.data) {
      router.replace("/notes");
    }
  }

  return (
    <div className="app-body">
      <aside className="sidebar">
        <div className="sidebar-title">Create</div>
        <p className="small">Fill out the form to add a new note.</p>
      </aside>
      <main className="content">
        <NoteEditor onSubmit={handleCreate} submitLabel="Create" />
      </main>
    </div>
  );
}
