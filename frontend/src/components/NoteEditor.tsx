"use client";

import { Note, NoteInput } from "@/lib/types";
import { useState } from "react";

interface NoteEditorProps {
  initial?: Partial<Note>;
  onSubmit: (data: NoteInput) => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
  submitLabel?: string;
}

export default function NoteEditor({ initial, onSubmit, onDelete, submitLabel = "Save" }: NoteEditorProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [category, setCategory] = useState(initial?.category || "Uncategorized");
  const [tags, setTags] = useState((initial?.tags || []).join(", "));
  const [busy, setBusy] = useState(false);

  // PUBLIC_INTERFACE
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const input: NoteInput = {
      title: title.trim(),
      content: content.trim(),
      category: category.trim() || "Uncategorized",
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    await onSubmit(input);
    setBusy(false);
  }

  return (
    <form className="card note-card" onSubmit={handleSubmit}>
      <div style={{ display: "grid", gap: 10 }}>
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Title"
        />
        <input
          className="input"
          placeholder="Category (e.g., Personal, Work)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Category"
        />
        <textarea
          className="textarea"
          placeholder="Write your note…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          aria-label="Content"
        />
        <input
          className="input"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          aria-label="Tags"
        />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          {onDelete && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDelete()}
              disabled={busy}
            >
              Delete
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
