"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AuthPage() {
  const { user, login, signup } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (user) {
    // already signed in
    if (typeof window !== "undefined") router.replace("/notes");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const action = mode === "signin" ? login : signup;
    const res = await action({ email, password });
    if (res.ok) {
      router.replace("/notes");
    } else {
      setError(res.error || "Something went wrong");
    }
    setBusy(false);
  }

  return (
    <main className="content">
      <div className="card auth-card">
        <h1 className="note-title" style={{ marginBottom: 8 }}>
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="note-content" style={{ marginBottom: 16 }}>
          {mode === "signin"
            ? "Access your notes by signing in."
            : "Create an account to start saving notes."}
        </p>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
          <input
            type="email"
            className="input"
            placeholder="Email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          {error && <div className="small" style={{ color: "#ef4444" }}>{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>
        <div className="small" style={{ marginTop: 10 }}>
          {mode === "signin" ? (
            <>
              New here?{" "}
              <button className="link" onClick={() => setMode("signup")}>Create an account</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button className="link" onClick={() => setMode("signin")}>Sign in</button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
