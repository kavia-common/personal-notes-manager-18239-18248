"use client";

import React from "react";

interface SidebarProps {
  categories: string[];
  active: string;
  onSelect: (c: string) => void;
}

export default function Sidebar({ categories, active, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Categories</div>
      <nav aria-label="Categories">
        <ul style={{ listStyle: "none", display: "grid", gap: 8 }}>
          {categories.map((c) => {
            const isActive = active === c || (active === "All" && c === "All");
            return (
              <li key={c}>
                <button
                  className={`category ${isActive ? "active" : ""}`}
                  onClick={() => onSelect(c)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {c}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
