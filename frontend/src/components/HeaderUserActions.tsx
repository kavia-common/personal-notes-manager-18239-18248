"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function HeaderUserActions() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="header-actions">
        <Link className="btn btn-outline" href="/auth">Sign in</Link>
      </div>
    );
  }

  return (
    <div className="header-actions">
      <span className="small mono" aria-label="Signed in email">{user.email}</span>
      <button
        className="btn btn-outline"
        onClick={async () => {
          await logout();
          router.push("/auth");
        }}
      >
        Sign out
      </button>
    </div>
  );
}
