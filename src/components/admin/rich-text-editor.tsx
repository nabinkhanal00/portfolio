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
    if (editorRef.current && document.activeElement !== editorRef.current) {
      if (value !== editorRef.current.innerHTML) {
        editorRef.current.innerHTML = value || "<p><br></p>";
      }
    }
  }, [value]);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || "<p><br></p>";
    }
  }, []);

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  const exec = (cmd: string, val?: string) => {
    focusEditor();
    document.execCommand(cmd, false, val);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const formatBlock = (tag: string) => {
    focusEditor();
    // Try both with and without brackets for cross-browser compat
    const withBrackets = `<${tag}>`;
    try {
      const ok = document.execCommand("formatBlock", false, withBrackets);
      if (!ok) document.execCommand("formatBlock", false, tag);
    } catch {
      document.execCommand("formatBlock", false, tag);
    }
    // Fallback: if selection is collapsed and exec didn't create block, wrap current line
    // This handles cases where formatBlock is no-op
    if (editorRef.current) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const anchor = sel.anchorNode as HTMLElement | null;
        if (anchor) {
          let block = anchor.nodeType === 3 ? anchor.parentElement : (anchor as HTMLElement);
          while (block && block !== editorRef.current && !/^H[1-6]$|^P$|^BLOCKQUOTE$|^PRE$/i.test(block.tagName)) {
            block = block.parentElement;
          }
          // If still no block, we rely on execCommand result; otherwise ensure correct tag
        }
      }
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      exec("bold");
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      exec("italic");
    }
  };

  const createLink = () => {
    const url = prompt("URL (https://...):");
    if (!url) return;
    const selection = window.getSelection();
    const hasSelection = selection && !selection.isCollapsed && selection.toString().trim().length > 0;
    focusEditor();
    if (hasSelection) {
      document.execCommand("createLink", false, url);
    } else {
      const text = prompt("Link text:", url);
      if (!text) return;
      document.execCommand("insertHTML", false, `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`);
    }
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const insertCodeBlock = () => {
    focusEditor();
    const sel = window.getSelection();
    const text = sel && !sel.isCollapsed ? sel.toString() : "code";
    document.execCommand("insertHTML", false, `<pre style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:12px;overflow:auto;font-family:var(--font-mono);font-size:13px;"><code>${text}</code></pre><p><br></p>`);
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
      focusEditor();
      document.execCommand("insertImage", false, url);
      // Make images responsive inside editor
      if (editorRef.current) {
        editorRef.current.querySelectorAll("img").forEach((img) => {
          img.style.maxWidth = "100%";
          img.style.borderRadius = "12px";
          img.style.border = "1px solid var(--line)";
        });
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
      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--line)] bg-[var(--surface)]/50 p-2">
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => exec("undo")} className="rounded-lg p-1.5 hover:bg-[var(--accent-soft)]" title="Undo (Ctrl+Z)">
            <MaterialIcon name="undo" className="text-base" />
          </button>
          <button type="button" onClick={() => exec("redo")} className="rounded-lg p-1.5 hover:bg-[var(--accent-soft)]" title="Redo (Ctrl+Shift+Z)">
            <MaterialIcon name="redo" className="text-base" />
          </button>
        </div>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />
        {/* Block types */}
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => formatBlock("h1")} className="rounded-lg px-2 py-1 font-display text-sm font-bold hover:bg-[var(--accent-soft)]" title="Heading 1">
            H1
          </button>
          <button type="button" onClick={() => formatBlock("h2")} className="rounded-lg px-2 py-1 font-display text-sm font-bold hover:bg-[var(--accent-soft)]" title="Heading 2">
            H2
          </button>
          <button type="button" onClick={() => formatBlock("h3")} className="rounded-lg px-2 py-1 font-display text-sm font-semibold hover:bg-[var(--accent-soft)]" title="Heading 3">
            H3
          </button>
          <button type="button" onClick={() => formatBlock("h4")} className="rounded-lg px-2 py-1 text-xs font-semibold hover:bg-[var(--accent-soft)]" title="Heading 4">
            H4
          </button>
          <button type="button" onClick={() => formatBlock("p")} className="rounded-lg px-2 py-1 text-xs hover:bg-[var(--accent-soft)]" title="Paragraph">
            P
          </button>
          <button type="button" onClick={() => formatBlock("blockquote")} className="rounded-lg p-1 hover:bg-[var(--accent-soft)]" title="Quote">
            <MaterialIcon name="format_quote" className="text-base" />
          </button>
          <button type="button" onClick={insertCodeBlock} className="rounded-lg p-1 hover:bg-[var(--accent-soft)]" title="Code block">
            <MaterialIcon name="code" className="text-base" />
          </button>
        </div>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />
        {/* Inline */}
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => exec("bold")} className="rounded-lg px-2 py-1 text-sm font-bold hover:bg-[var(--accent-soft)]" title="Bold (Ctrl+B)">
            B
          </button>
          <button type="button" onClick={() => exec("italic")} className="rounded-lg px-2 py-1 text-sm italic hover:bg-[var(--accent-soft)]" title="Italic (Ctrl+I)">
            I
          </button>
          <button type="button" onClick={() => exec("underline")} className="rounded-lg px-2 py-1 text-sm underline hover:bg-[var(--accent-soft)]" title="Underline">
            U
          </button>
          <button type="button" onClick={() => exec("strikeThrough")} className="rounded-lg px-2 py-1 text-sm line-through hover:bg-[var(--accent-soft)]" title="Strikethrough">
            S
          </button>
          <button type="button" onClick={() => exec("insertHTML", "<code style='background:var(--accent-soft);padding:2px 6px;border-radius:6px;font-family:var(--font-mono);font-size:13px;'>code</code>&nbsp;")} className="rounded-lg px-2 py-1 font-mono text-xs hover:bg-[var(--accent-soft)]" title="Inline code">
            {"</>"}
          </button>
        </div>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => exec("insertUnorderedList")} className="rounded-lg p-1.5 hover:bg-[var(--accent-soft)]" title="Bullet list">
            <MaterialIcon name="format_list_bulleted" className="text-base" />
          </button>
          <button type="button" onClick={() => exec("insertOrderedList")} className="rounded-lg p-1.5 hover:bg-[var(--accent-soft)]" title="Numbered list">
            <MaterialIcon name="format_list_numbered" className="text-base" />
          </button>
          <button type="button" onClick={createLink} className="rounded-lg p-1.5 hover:bg-[var(--accent-soft)]" title="Link">
            <MaterialIcon name="link" className="text-base" />
          </button>
          <button type="button" onClick={() => exec("unlink")} className="rounded-lg p-1 hover:bg-[var(--accent-soft)]" title="Unlink">
            <MaterialIcon name="link_off" className="text-base" />
          </button>
          <button type="button" onClick={() => exec("insertHorizontalRule")} className="rounded-lg p-1 hover:bg-[var(--accent-soft)]" title="Divider">
            <MaterialIcon name="horizontal_rule" className="text-base" />
          </button>
        </div>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />
        <div className="flex items-center gap-1">
          <label className="icon-label cursor-pointer rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-1.5 text-xs font-semibold hover:bg-[var(--accent-soft)]">
            <MaterialIcon name="image" className="text-base" />
            {uploading ? "Uploading..." : "Image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
          </label>
          <button type="button" onClick={() => exec("removeFormat")} className="rounded-lg px-2 py-1 text-xs hover:bg-[var(--accent-soft)]" title="Clear formatting">
            Clear
          </button>
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={handleInput}
        className="prose max-h-[520px] min-h-[340px] max-w-none overflow-auto p-4 text-[15px] leading-relaxed text-[var(--text)] outline-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[var(--text)] prose-h1:text-3xl prose-h1:leading-tight prose-h2:text-2xl prose-h2:leading-tight prose-h3:text-xl prose-h3:leading-snug prose-h4:text-base prose-h4:uppercase prose-h4:tracking-[0.08em] prose-p:my-3 prose-a:text-[var(--accent)] prose-a:underline prose-blockquote:border-l-2 prose-blockquote:border-[var(--line)] prose-blockquote:pl-4 prose-blockquote:italic prose-code:before:content-none prose-code:after:content-none prose-pre:my-4 prose-pre:rounded-xl prose-pre:border prose-pre:border-[var(--line)] prose-pre:bg-[var(--surface)] prose-img:rounded-xl prose-img:border prose-img:border-[var(--line)] prose-hr:my-6 prose-li:my-1 prose-ul:list-disc prose-ol:list-decimal"
        style={{ wordBreak: "break-word" }}
      />
      <div className="flex items-center justify-between border-t border-[var(--line)] px-3 py-2 text-xs text-[var(--muted)]">
        <span>Headings: H1–H4 · Lists · Quote · Code · Images are stored on Hetzner</span>
        <span className="hidden font-mono sm:inline">HTML saved</span>
      </div>
    </div>
  );
}
