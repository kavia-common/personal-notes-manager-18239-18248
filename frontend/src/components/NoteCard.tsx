"use client";

import { Note } from "@/lib/types";
import Link from "next/link";

export default function NoteCard({ note }: { note: Note }) {
  const date = new Date(note.updatedAt).toLocaleString();
  return (
    <article className="card note-card" aria-label={note.title}>
      <header className="flex items-start justify-between">
        <h3 className="note-title">{note.title || "Untitled"}</h3>
        <Link className="btn btn-outline small" href={`/notes/${note.id}/edit`}>Edit</Link>
      </header>
      <p className="note-content">{note.content.slice(0, 160) || "No content"}</p>
      <div className="note-meta">{note.category || "Uncategorized"} · Updated {date}</div>
    </article>
  );
}
