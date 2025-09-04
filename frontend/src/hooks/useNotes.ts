"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { apiCreateNote, apiDeleteNote, apiListNotes, apiUpdateNote, getCategoriesFromNotes } from "@/lib/api";
import { ApiResult, Note, NoteInput } from "@/lib/types";

interface NotesState {
  notes: Note[];
  loading: boolean;
  search: string;
  category: string;
  categories: string[];
  // PUBLIC_INTERFACE
  refresh: () => Promise<void>;
  // PUBLIC_INTERFACE
  setSearch: (s: string) => void;
  // PUBLIC_INTERFACE
  setCategory: (c: string) => void;
  // PUBLIC_INTERFACE
  createNote: (input: NoteInput) => Promise<ApiResult<Note>>;
  // PUBLIC_INTERFACE
  updateNote: (id: string, input: NoteInput) => Promise<ApiResult<Note>>;
  // PUBLIC_INTERFACE
  deleteNote: (id: string) => Promise<ApiResult<true>>;
}

export function useNotes(): NotesState {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("All");

  const refresh = useCallback(async () => {
    setLoading(true);
    const res = await apiListNotes({
      search: search || undefined,
      category: category !== "All" ? category : undefined,
    });
    if (res.ok && res.data) {
      setNotes(res.data);
    }
    setLoading(false);
  }, [search, category]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const categories = useMemo(() => getCategoriesFromNotes(notes), [notes]);

  const createNote = useCallback(async (input: NoteInput) => {
    const res = await apiCreateNote(input);
    if (res.ok && res.data) {
      setNotes((prev) => [res.data!, ...prev]);
    }
    return res;
  }, []);

  const updateNote = useCallback(async (id: string, input: NoteInput) => {
    const res = await apiUpdateNote(id, input);
    if (res.ok && res.data) {
      setNotes((prev) => prev.map((n) => (n.id === id ? res.data! : n)));
    }
    return res;
  }, []);

  const deleteNote = useCallback(async (id: string) => {
    const res = await apiDeleteNote(id);
    if (res.ok) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
    return res;
  }, []);

  return {
    notes,
    loading,
    search,
    category,
    categories,
    refresh,
    setSearch,
    setCategory,
    createNote,
    updateNote,
    deleteNote,
  };
}
