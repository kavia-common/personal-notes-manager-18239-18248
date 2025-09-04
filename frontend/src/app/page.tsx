"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.replace("/notes");
    }
  }, [loading, router]);

  return (
    <main className="content">
      <div className="card note-card">
        <p>Loading…</p>
      </div>
    </main>
  );
}
