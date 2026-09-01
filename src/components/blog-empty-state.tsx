"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { API_URL } from "@/lib/api";

export function BlogEmptyState() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("portfolio_admin_token");
    if (!token) {
      setChecking(false);
      return;
    }
    fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => setIsAuthed(r.ok))
      .catch(() => setIsAuthed(false))
      .finally(() => setChecking(false));
  }, []);

  return (
    <section className="py-16">
      <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] p-10 text-center md:p-14">
        <div className="mx-auto max-w-xl">
          <MaterialIcon name="article" className="mx-auto text-3xl text-[var(--muted)] opacity-40" />
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-[var(--text)]">No entries yet</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Published entries will appear here.</p>
          {!checking && isAuthed && (
            <Link href="/admin" className="btn btn-primary mx-auto mt-6">
              <MaterialIcon name="edit" className="text-base" />
              Write first entry
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function BlogHeaderNewEntry() {
  const [isAuthed, setIsAuthed] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("portfolio_admin_token");
    if (!token) return;
    fetch(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setIsAuthed(r.ok))
      .catch(() => {});
  }, []);
  if (!isAuthed) return null;
  return (
    <Link href="/admin" className="icon-label rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]">
      <MaterialIcon name="edit_note" className="text-sm" />
      New entry
    </Link>
  );
}
