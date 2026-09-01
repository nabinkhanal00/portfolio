"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import { API_URL } from "@/lib/api";
import { MaterialIcon } from "@/components/material-icon";

type Props = { value: string; onChange: (html: string) => void; token: string | null };
type Variant = "simple" | "notion" | "docx" | "agent";

const VARIANT_KEY = "portfolio_editor_variant";

function useImageUpload(token: string | null, onUpload: (url: string) => void) {
  return async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!token) { alert("Not authenticated"); return; }
    const form = new FormData(); form.append("image", file);
    const res = await fetch(`${API_URL}/api/upload`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    const url = data.url.startsWith("http") ? data.url : `${API_URL}${data.url}`;
    onUpload(url);
    e.target.value = "";
  };
}

// ---------- Simple ----------
function SimpleEditor({ value, onChange, token }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Image.configure({ HTMLAttributes: { class: "rounded-xl border border-[var(--line)] max-w-full" } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-[var(--accent)] underline" } }),
      Placeholder.configure({ placeholder: "Write… H1–H4, lists, quote, code, images → Hetzner" }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "prose max-w-none min-h-[340px] max-h-[520px] overflow-auto p-4 text-[15px] leading-relaxed outline-none prose-headings:font-display prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:uppercase prose-a:text-[var(--accent)] prose-img:rounded-xl prose-pre:bg-[var(--surface)]" } },
  });
  useEffect(() => { if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "<p></p>"); }, [value, editor]);
  if (!editor) return null;
  const handleImg = useImageUpload(token, (url) => editor.chain().focus().setImage({ src: url }).run());
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = prompt("URL:", prev || "https://"); if (url === null) return;
    if (url === "") editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };
  const b = (a: boolean) => `rounded-lg px-2 py-1 text-sm hover:bg-[var(--accent-soft)] ${a ? "bg-[var(--accent-soft)] text-[var(--accent)]" : ""}`;
  const ib = (a: boolean) => `rounded-lg p-1.5 hover:bg-[var(--accent-soft)] ${a ? "bg-[var(--accent-soft)] text-[var(--accent)]" : ""}`;
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]">
      <div className="flex flex-wrap gap-1 border-b border-[var(--line)] bg-[var(--surface)]/50 p-2">
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={b(editor.isActive("heading", { level: 1 }))}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={b(editor.isActive("heading", { level: 2 }))}>H2</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={b(editor.isActive("heading", { level: 3 }))}>H3</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={b(editor.isActive("heading", { level: 4 }))}>H4</button>
        <button onClick={() => editor.chain().focus().setParagraph().run()} className={b(editor.isActive("paragraph"))}>P</button>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={b(editor.isActive("bold"))}><b>B</b></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={b(editor.isActive("italic"))}><i>I</i></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={b(editor.isActive("strike"))}><span className="line-through">S</span></button>
        <button onClick={() => editor.chain().focus().toggleCode().run()} className={b(editor.isActive("code"))}>{"</>"}</button>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={ib(editor.isActive("bulletList"))}><MaterialIcon name="format_list_bulleted" className="text-base" /></button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={ib(editor.isActive("orderedList"))}><MaterialIcon name="format_list_numbered" className="text-base" /></button>
        <button onClick={setLink} className={ib(editor.isActive("link"))}><MaterialIcon name="link" className="text-base" /></button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={ib(editor.isActive("blockquote"))}><MaterialIcon name="format_quote" className="text-base" /></button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={ib(editor.isActive("codeBlock"))}><MaterialIcon name="code" className="text-base" /></button>
        <label className="icon-label cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold hover:bg-[var(--accent-soft)]"><MaterialIcon name="image" className="text-base" />Image<input type="file" accept="image/*" className="hidden" onChange={handleImg} /></label>
      </div>
      <EditorContent editor={editor} />
      <style>{`.tiptap p.is-editor-empty:first-child::before{content:attr(data-placeholder);float:left;color:var(--muted);opacity:.4;pointer-events:none;height:0}.tiptap{outline:none}`}</style>
    </div>
  );
}

// ---------- Notion-like ----------
function NotionEditor({ value, onChange, token }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, codeBlock: false }),
      Image, Link.configure({ openOnClick: false }), Placeholder.configure({ placeholder: "Type '/' for commands, or just write…" }),
      Typography, Highlight,
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "prose max-w-none min-h-[420px] p-6 text-[15px] leading-relaxed outline-none prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-img:rounded-xl" } },
  });
  useEffect(() => { if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "<p></p>"); }, [value, editor]);
  if (!editor) return null;
  const handleImg = useImageUpload(token, (url) => editor.chain().focus().setImage({ src: url }).run());
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]">
      <div className="flex items-center gap-2 border-b border-[var(--line)] px-3 py-2 text-xs text-[var(--muted)]">
        <MaterialIcon name="auto_awesome" className="text-sm text-[var(--accent)]" /> Notion-like • Type “/” for H1/H2/Todo/Table • drag handle on hover
      </div>
      <div className="relative">
        <EditorContent editor={editor} />
        <label className="absolute bottom-3 right-3 icon-label cursor-pointer rounded-full border bg-white px-3 py-1.5 text-xs shadow hover:bg-[var(--accent-soft)]"><MaterialIcon name="image" className="text-base" />Upload<input type="file" accept="image/*" className="hidden" onChange={handleImg} /></label>
      </div>
      <div className="flex flex-wrap gap-1 border-t border-[var(--line)] p-2">
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`rounded px-2 py-1 text-xs border ${editor.isActive("heading", { level: 1 }) ? "bg-black text-white" : ""}`}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`rounded px-2 py-1 text-xs border ${editor.isActive("heading", { level: 2 }) ? "bg-black text-white" : ""}`}>H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`rounded px-2 py-1 text-xs border ${editor.isActive("bulletList") ? "bg-black text-white" : ""}`}>List</button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className="rounded px-2 py-1 text-xs border">Code</button>
      </div>
      <style>{`.tiptap p.is-editor-empty:first-child::before{content:attr(data-placeholder);float:left;opacity:.4;pointer-events:none}`}</style>
    </div>
  );
}

// ---------- Docx ----------
function DocxEditor({ value, onChange, token }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline, Highlight, Typography, TextStyle, Color, FontFamily,
      Table.configure({ resizable: true }), TableRow, TableHeader, TableCell,
      Image, Link, Placeholder.configure({ placeholder: "Document body…" }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "prose max-w-none min-h-[500px] p-8 text-[15px] leading-relaxed outline-none prose-h1:text-3xl prose-h2:text-2xl prose-img:rounded-none" } },
  });
  useEffect(() => { if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "<p></p>"); }, [value, editor]);
  if (!editor) return null;
  const handleImg = useImageUpload(token, (url) => editor.chain().focus().setImage({ src: url }).run());
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[#f3f3f3] p-4">
      <div className="flex flex-wrap gap-1 rounded-xl border bg-white p-2 shadow-sm">
        <select onChange={(e) => { const v = e.target.value; if (v === "p") editor.chain().focus().setParagraph().run(); else editor.chain().focus().toggleHeading({ level: Number(v) as 1 | 2 | 3 | 4 }).run(); }} className="rounded border px-2 py-1 text-xs" defaultValue="p"><option value="p">Paragraph</option><option value="1">Heading 1</option><option value="2">Heading 2</option><option value="3">Heading 3</option></select>
        <select onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()} className="rounded border px-2 py-1 text-xs" defaultValue=""><option value="">Font</option><option value="Inter">Inter</option><option value="Georgia">Georgia</option><option value="var(--font-mono)">Mono</option></select>
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`rounded px-2 py-1 text-sm ${editor.isActive("bold") ? "bg-black text-white" : "border"}`}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`rounded px-2 py-1 text-sm ${editor.isActive("italic") ? "bg-black text-white" : "border"}`}>I</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`rounded px-2 py-1 text-sm ${editor.isActive("underline") ? "bg-black text-white" : "border"}`}>U</button>
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={`rounded p-1 ${editor.isActive({ textAlign: "left" }) ? "bg-black text-white" : "border"}`}><MaterialIcon name="format_align_left" className="text-base" /></button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={`rounded p-1 ${editor.isActive({ textAlign: "center" }) ? "bg-black text-white" : "border"}`}><MaterialIcon name="format_align_center" className="text-base" /></button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={`rounded p-1 ${editor.isActive({ textAlign: "right" }) ? "bg-black text-white" : "border"}`}><MaterialIcon name="format_align_right" className="text-base" /></button>
        <input type="color" onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()} className="h-7 w-7 rounded border p-0" title="Text color" />
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="rounded border px-2 py-1 text-xs">Table</button>
        <label className="rounded border bg-white px-2 py-1 text-xs cursor-pointer">Image<input type="file" accept="image/*" className="hidden" onChange={handleImg} /></label>
      </div>
      <div className="mx-auto mt-4 max-w-[720px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <div className="min-h-[620px] p-10">
          <EditorContent editor={editor} />
        </div>
        <div className="border-t px-6 py-2 text-center font-mono text-[11px] text-[var(--muted)]">Page 1 • A4 • Docx-like</div>
      </div>
    </div>
  );
}

// ---------- Agent ----------
function AgentEditor({ value, onChange, token }: Props) {
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [ StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }), Image, Link, Placeholder.configure({ placeholder: "Write with agent… Ask to expand, fix or generate." }) ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "prose max-w-none min-h-[340px] max-h-[420px] overflow-auto p-4 text-[15px] outline-none" } },
  });
  useEffect(() => { if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "<p></p>"); }, [value, editor]);
  if (!editor) return null;
  const handleImg = useImageUpload(token, (url) => editor.chain().focus().setImage({ src: url }).run());
  const runAgent = async () => {
    if (!prompt.trim()) return;
    setBusy(true);
    // Mock agent: in production, call your LLM endpoint; here we insert a structured draft
    await new Promise((r) => setTimeout(r, 600));
    const draft = `<h2>${prompt.slice(0, 60)}</h2><p>Agent draft for: <em>${prompt}</em></p><ul><li>Point 1: context</li><li>Point 2: trade-offs</li><li>Point 3: next steps</li></ul><blockquote>Tip: edit and add images via toolbar.</blockquote>`;
    editor.chain().focus().insertContent(draft).run();
    setPrompt("");
    setBusy(false);
  };
  return (
    <div className="grid gap-3 md:grid-cols-[1.35fr_0.65fr]">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]">
        <div className="flex flex-wrap gap-1 border-b p-2">
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="rounded px-2 py-1 text-sm border">H2</button>
          <button onClick={() => editor.chain().focus().toggleBold().run()} className="rounded px-2 py-1 text-sm border"><b>B</b></button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="rounded p-1 border"><MaterialIcon name="format_list_bulleted" className="text-base" /></button>
          <label className="rounded border px-2 py-1 text-xs cursor-pointer">Image<input type="file" accept="image/*" className="hidden" onChange={handleImg} /></label>
        </div>
        <EditorContent editor={editor} />
      </div>
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
        <p className="icon-label text-xs font-bold tracking-[0.14em] uppercase opacity-60"><MaterialIcon name="smart_toy" className="text-sm text-[var(--accent)]" /> Agent</p>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} placeholder="Ask agent: outline on Raft, fix grammar, expand section…" className="mt-3 w-full rounded-xl border bg-white p-3 text-sm outline-none focus:border-[var(--accent)]" />
        <button onClick={runAgent} disabled={busy || !prompt.trim()} className="btn btn-primary mt-3 w-full justify-center disabled:opacity-50"><MaterialIcon name={busy ? "progress_activity" : "auto_awesome"} className="text-base" />{busy ? "Generating…" : "Generate"}</button>
        <div className="mt-3 rounded-xl border border-dashed bg-white p-3 text-xs leading-relaxed text-[var(--muted)]">
          <p className="font-semibold text-[var(--text)]">Agent inserts</p>
          <p className="mt-1">H2 + summary + bullets + quote. Replace prompt with your LLM endpoint later.</p>
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={() => editor.chain().focus().insertContent("<p><em>TL;DR: </em>summarize key points here.</p>").run()} className="rounded-full border px-3 py-1 text-xs">TL;DR</button>
          <button onClick={() => editor.chain().focus().insertContent("<blockquote>Note: verify with production data.</blockquote><p></p>").run()} className="rounded-full border px-3 py-1 text-xs">Note</button>
        </div>
      </div>
    </div>
  );
}

export function RichTextEditor(props: Props) {
  const [variant, setVariant] = useState<Variant>("simple");
  useEffect(() => {
    const v = localStorage.getItem(VARIANT_KEY) as Variant | null;
    if (v && ["simple", "notion", "docx", "agent"].includes(v)) setVariant(v);
  }, []);
  const switchVariant = (v: Variant) => { setVariant(v); localStorage.setItem(VARIANT_KEY, v); };
  const tab = (v: Variant, label: string, icon: string) => (
    <button key={v} onClick={() => switchVariant(v)} className={`icon-label rounded-full px-3 py-1.5 text-xs font-semibold ${variant === v ? "bg-[var(--text)] text-white" : "border border-[var(--line)] hover:bg-[var(--accent-soft)]"}`}>
      <MaterialIcon name={icon} className="text-sm" />{label}
    </button>
  );
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {tab("simple", "Simple", "edit_note")}
        {tab("notion", "Notion", "view_kanban")}
        {tab("docx", "Docx", "description")}
        {tab("agent", "Agent", "smart_toy")}
      </div>
      {variant === "simple" && <SimpleEditor {...props} />}
      {variant === "notion" && <NotionEditor {...props} />}
      {variant === "docx" && <DocxEditor {...props} />}
      {variant === "agent" && <AgentEditor {...props} />}
      <p className="text-xs text-[var(--muted)]">TipTap • {variant} • all variants save same HTML to <code className="rounded bg-[var(--accent-soft)] px-1">api.nabinkhanal00.com.np</code></p>
    </div>
  );
}
