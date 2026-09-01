"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/material-icon";
import { API_URL } from "@/lib/api";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("portfolio_admin_token", data.token);
      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <div className="mx-auto max-w-md rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-8">
        <h1 className="icon-label text-2xl font-bold text-[var(--text)]">
          <MaterialIcon name="lock" className="text-2xl text-[var(--accent)]" />
          Admin login
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Enter the blog admin password to publish and manage posts. Backend: {API_URL}</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold tracking-widest text-[var(--muted)] uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>
          {error && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center">
            <MaterialIcon name={loading ? "progress_activity" : "login"} className="text-base" />
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-xs text-[var(--muted)]">
          Images are stored on Hetzner at <code className="rounded bg-[var(--accent-soft)] px-1">/uploads</code>. Drafts are hidden from public blog until published.
        </p>
      </div>
    </main>
  );
}
