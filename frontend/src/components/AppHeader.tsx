"use client";

import Link from "next/link";
import HeaderUserActions from "@/components/HeaderUserActions";

export default function AppHeader() {
  return (
    <header className="app-header">
      <Link href="/" className="brand" aria-label="Home">
        <span className="brand-badge" />
        <span>Notes</span>
      </Link>
      <nav className="header-actions">
        <Link className="btn btn-outline" href="/notes">All notes</Link>
        <Link className="btn btn-outline" href="/notes/new">New</Link>
        <HeaderUserActions />
      </nav>
    </header>
  );
}
