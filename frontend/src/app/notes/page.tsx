"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useNotes } from "@/hooks/useNotes";
import Sidebar from "@/components/Sidebar";
import NoteCard from "@/components/NoteCard";

export default function NotesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { notes, loading: notesLoading, search, setSearch, category, setCategory, categories } = useNotes();

  if (!loading && !user) {
    if (typeof window !== "undefined") router.replace("/auth");
  }

  return (
    <>
      <div className="app-body">
        <Sidebar categories={categories} active={category} onSelect={setCategory} />
        <main className="content">
          <div className="toolbar">
            <input
              className="input"
              placeholder="Search notes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search"
            />
            <Link href="/notes/new" className="btn btn-primary">New Note</Link>
          </div>

          {notesLoading ? (
            <div className="card note-card">Loading notes…</div>
          ) : notes.length === 0 ? (
            <div className="card note-card">No notes yet. Click “New Note” to create one.</div>
          ) : (
            <section className="grid-notes" aria-label="Notes list">
              {notes.map((n) => (
                <NoteCard key={n.id} note={n} />
              ))}
            </section>
          )}
        </main>
      </div>

      <Link href="/notes/new" className="fab" aria-label="Add note">＋</Link>
    </>
  );
}
