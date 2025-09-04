import React from "react";

export default function NotFound() {
  return (
    <main className="content">
      <section className="card note-card" role="alert" aria-live="assertive">
        <h1 className="note-title">404 – Page Not Found</h1>
        <p className="note-content">The page you’re looking for doesn’t exist.</p>
      </section>
    </main>
  );
}
