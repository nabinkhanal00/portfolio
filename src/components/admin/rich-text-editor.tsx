"use client";

import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/api";
import { MaterialIcon } from "@/components/material-icon";

type Props = {
  value: string;
  onChange: (html: string) => void;
  token: string | null;
};

export function RichTextEditor({ value, onChange, token }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || "";
    }
  }, []); // only on mount, avoid cursor jump

  const exec = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!token) {
      alert("Not authenticated");
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Upload failed");
      }
      const data = await res.json();
      const url = data.url.startsWith("http") ? data.url : `${API_URL}${data.url}`;
      // insert image at cursor
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand("insertImage", false, url);
        onChange(editorRef.current.innerHTML);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]">
      <div className="flex flex-wrap gap-1 border-b border-[var(--line)] p-2">
        <button type="button" onClick={() => exec("bold")} className="rounded-lg px-2 py-1 text-sm font-bold hover:bg-[var(--accent-soft)]" title="Bold">
          B
        </button>
        <button type="button" onClick={() => exec("italic")} className="rounded-lg px-2 py-1 text-sm italic hover:bg-[var(--accent-soft)]" title="Italic">
          I
        </button>
        <button type="button" onClick={() => exec("underline")} className="rounded-lg px-2 py-1 text-sm underline hover:bg-[var(--accent-soft)]" title="Underline">
          U
        </button>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />
        <button type="button" onClick={() => exec("formatBlock", "<h2>")} className="rounded-lg px-2 py-1 text-sm hover:bg-[var(--accent-soft)]">H2</button>
        <button type="button" onClick={() => exec("formatBlock", "<h3>")} className="rounded-lg px-2 py-1 text-sm hover:bg-[var(--accent-soft)]">H3</button>
        <button type="button" onClick={() => exec("formatBlock", "<p>")} className="rounded-lg px-2 py-1 text-sm hover:bg-[var(--accent-soft)]">P</button>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />
        <button type="button" onClick={() => exec("insertUnorderedList")} className="rounded-lg p-1 hover:bg-[var(--accent-soft)]" title="Bullet list">
          <MaterialIcon name="format_list_bulleted" className="text-base" />
        </button>
        <button type="button" onClick={() => exec("insertOrderedList")} className="rounded-lg p-1 hover:bg-[var(--accent-soft)]" title="Numbered list">
          <MaterialIcon name="format_list_numbered" className="text-base" />
        </button>
        <button type="button" onClick={() => exec("createLink", prompt("URL:") || "")} className="rounded-lg p-1 hover:bg-[var(--accent-soft)]" title="Link">
          <MaterialIcon name="link" className="text-base" />
        </button>
        <button type="button" onClick={() => exec("formatBlock", "<blockquote>")} className="rounded-lg p-1 hover:bg-[var(--accent-soft)]" title="Quote">
          <MaterialIcon name="format_quote" className="text-base" />
        </button>
        <button type="button" onClick={() => exec("insertHorizontalRule")} className="rounded-lg p-1 hover:bg-[var(--accent-soft)]" title="Divider">
          <MaterialIcon name="horizontal_rule" className="text-base" />
        </button>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />
        <label className="icon-label cursor-pointer rounded-lg border border-[var(--line)] px-3 py-1 text-xs font-semibold hover:bg-[var(--accent-soft)]">
          <MaterialIcon name="image" className="text-base" />
          {uploading ? "Uploading..." : "Image"}
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
        </label>
        <button type="button" onClick={() => exec("removeFormat")} className="rounded-lg px-2 py-1 text-xs hover:bg-[var(--accent-soft)]">Clear</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[320px] p-4 text-[15px] leading-relaxed text-[var(--text)] outline-none prose max-w-none prose-p:my-3 prose-headings:mt-6 prose-img:rounded-xl"
        style={{ wordBreak: "break-word" }}
      />
      <p className="border-t border-[var(--line)] p-2 text-xs text-[var(--muted)]">Content is stored as HTML. Images are uploaded to Hetzner and inserted via URL.</p>
    </div>
  );
}
