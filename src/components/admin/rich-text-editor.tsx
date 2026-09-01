"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "@/components/tiptap-ui-primitive/toolbar";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import { ColorHighlightPopover } from "@/components/tiptap-ui/color-highlight-popover";
import { LinkPopover } from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { API_URL } from "@/lib/api";
import { MaterialIcon } from "@/components/material-icon";
import { marked } from "marked";
import TurndownService from "turndown";

type Props = { value: string; onChange: (html: string) => void; token: string | null };
type Variant = "simple" | "notion" | "markdown";
const KEY = "portfolio_editor_variant";
const turndown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });

function useImageUpload(token: string | null) {
  return async (file: File): Promise<string> => {
    if (!token) throw new Error("Not authenticated");
    const form = new FormData(); form.append("image", file);
    const res = await fetch(`${API_URL}/api/upload`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url.startsWith("http") ? data.url : `${API_URL}${data.url}`;
  };
}

// ---------- Simple (tiptap simple template) ----------
function SimpleRichEditor({ value, onChange, token }: Props) {
  const handleUpload = useImageUpload(token);
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: { attributes: { class: "simple-editor", autocomplete: "off", autocorrect: "off", autocapitalize: "off" } as any },
    extensions: [
      StarterKit.configure({ horizontalRule: false, link: { openOnClick: false, enableClickSelection: true } }),
      HorizontalRule, TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList, TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }), Image, Typography, Superscript, Subscript, Selection,
      ImageUploadNode.configure({ accept: "image/*", maxSize: 5 * 1024 * 1024, limit: 3, upload: handleUpload, onError: (e) => console.error(e) }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });
  useEffect(() => { if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "<p></p>"); }, [value, editor]);
  if (!editor) return null;
  return (
    <div className="simple-editor-wrapper rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar>
          <ToolbarGroup><UndoRedoButton action="undo" /><UndoRedoButton action="redo" /></ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup><HeadingDropdownMenu levels={[1, 2, 3, 4]} /><ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} /><BlockquoteButton /><CodeBlockButton /></ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup><MarkButton type="bold" /><MarkButton type="italic" /><MarkButton type="strike" /><MarkButton type="code" /><MarkButton type="underline" /></ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup><TextAlignButton align="left" /><TextAlignButton align="center" /><TextAlignButton align="right" /><TextAlignButton align="justify" /></ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup><ColorHighlightPopover /><LinkPopover /><ImageUploadButton text="Add" /></ToolbarGroup>
        </Toolbar>
        <EditorContent editor={editor} role="presentation" className="simple-editor-content min-h-[380px] p-6" />
      </EditorContext.Provider>
      <style>{`@import "@/components/tiptap-templates/simple/simple-editor.scss";`}</style>
    </div>
  );
}

// ---------- Notion-like ----------
function NotionEditor({ value, onChange, token }: Props) {
  const [slashOpen, setSlashOpen] = useState(false);
  const handleUpload = useImageUpload(token);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Typography, Highlight, Image, TextAlign.configure({ types: ["heading", "paragraph"] }),
      ImageUploadNode.configure({ accept: "image/*", maxSize: 5 * 1024 * 1024, limit: 3, upload: handleUpload }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      const text = editor.getText();
      const before = editor.state.doc.textContent.slice(Math.max(0, editor.state.selection.from - 2), editor.state.selection.from);
      setSlashOpen(before.endsWith("/") || text.endsWith("/"));
    },
    editorProps: { attributes: { class: "prose max-w-none min-h-[420px] p-8 text-[15px] leading-relaxed outline-none prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-img:rounded-xl", placeholder: "Type '/' for commands…" } as any },
  });
  useEffect(() => { if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "<p></p>"); }, [value, editor]);
  if (!editor) return null;
  const insert = (fn: () => void) => { editor.chain().focus().deleteRange({ from: editor.state.selection.from - 1, to: editor.state.selection.from }).run(); fn(); setSlashOpen(false); };
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]">
      <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--surface)]/50 px-3 py-2 text-xs text-[var(--muted)]">
        <MaterialIcon name="view_kanban" className="text-sm text-[var(--accent)]" /> Notion-like • Type “/” for blocks • drag handle on hover
      </div>
      <div className="relative">
        <EditorContent editor={editor} />
        {slashOpen && (
          <div className="absolute left-8 top-12 z-10 w-64 rounded-xl border bg-white p-2 shadow-xl">
            <p className="px-2 py-1 text-xs font-semibold text-[var(--muted)] uppercase">Blocks</p>
            <button onClick={() => insert(() => editor.chain().focus().toggleHeading({ level: 1 }).run())} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-100"><span className="font-bold">H1</span> Heading 1</button>
            <button onClick={() => insert(() => editor.chain().focus().toggleHeading({ level: 2 }).run())} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-100"><span className="font-bold">H2</span> Heading 2</button>
            <button onClick={() => insert(() => editor.chain().focus().toggleBulletList().run())} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-100">• Bullet list</button>
            <button onClick={() => insert(() => editor.chain().focus().toggleOrderedList().run())} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-100">1. Numbered</button>
            <button onClick={() => insert(() => editor.chain().focus().toggleBlockquote().run())} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-100">“ Quote</button>
            <button onClick={() => insert(() => editor.chain().focus().toggleCodeBlock().run())} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-100">Code</button>
            <button onClick={() => insert(() => editor.chain().focus().setHorizontalRule().run())} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-100">— Divider</button>
          </div>
        )}
      </div>
      <div className="flex gap-1 border-t p-2">
        <Button variant="ghost" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "bg-black text-white" : ""}>B</Button>
        <Button variant="ghost" onClick={() => editor.chain().focus().toggleItalic().run()}>I</Button>
        <label className="ml-auto cursor-pointer rounded-full border bg-white px-3 py-1 text-xs">Image<input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; const url = await handleUpload(f); editor.chain().focus().setImage({ src: url }).run(); }} /></label>
      </div>
    </div>
  );
}

// ---------- Markdown ----------
function MarkdownEditor({ value, onChange, token }: Props) {
  const [md, setMd] = useState(() => {
    try { return turndown.turndown(value || ""); } catch { return value || ""; }
  });
  const [preview, setPreview] = useState(true);
  useEffect(() => {
    try {
      const expected = turndown.turndown(value || "");
      if (expected !== md) setMd(expected);
    } catch {}
  }, [value]);

  const handleMdChange = (v: string) => {
    setMd(v);
    try {
      const html = marked.parse(v) as string;
      onChange(html);
    } catch { onChange(`<p>${v}</p>`); }
  };
  const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f || !token) return;
    const url = await (async () => {
      const form = new FormData(); form.append("image", f);
      const res = await fetch(`${API_URL}/api/upload`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
      const data = await res.json(); return data.url.startsWith("http") ? data.url : `${API_URL}${data.url}`;
    })();
    const insert = `![image](${url})`;
    const el = document.getElementById("md-textarea") as HTMLTextAreaElement | null;
    if (el) {
      const start = el.selectionStart, end = el.selectionEnd;
      const next = md.slice(0, start) + insert + md.slice(end);
      handleMdChange(next);
      setTimeout(() => { el.selectionStart = el.selectionEnd = start + insert.length; el.focus(); }, 0);
    } else handleMdChange(md + "\n" + insert);
    e.target.value = "";
  };
  const htmlPreview = (() => { try { return marked.parse(md) as string; } catch { return md; } })();

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="icon-label text-xs font-semibold"><MaterialIcon name="markdown" className="text-base" /> Markdown</span>
        <div className="flex gap-1">
          <button onClick={() => setPreview((p) => !p)} className="rounded-full border px-3 py-1 text-xs">{preview ? "Hide preview" : "Show preview"}</button>
          <label className="cursor-pointer rounded-full border bg-white px-3 py-1 text-xs">Image<input type="file" accept="image/*" className="hidden" onChange={handleImg} /></label>
        </div>
      </div>
      <div className={`grid ${preview ? "md:grid-cols-2" : ""} gap-0`}>
        <textarea id="md-textarea" value={md} onChange={(e) => handleMdChange(e.target.value)} placeholder="# Heading&#10;Write markdown… **bold**, *italic*, - list, > quote, ```code, ![image](url)" className="min-h-[420px] w-full resize-none bg-white p-4 font-mono text-sm outline-none" />
        {preview && <div className="prose max-w-none border-l bg-white p-4 text-sm prose-h1:text-2xl prose-h2:text-xl prose-img:rounded-xl" dangerouslySetInnerHTML={{ __html: htmlPreview }} />}
      </div>
      <p className="border-t px-3 py-2 text-xs text-[var(--muted)]">Markdown → HTML (marked + turndown) • saved as HTML to api</p>
    </div>
  );
}

export function RichTextEditor(props: Props) {
  const [variant, setVariant] = useState<Variant>("simple");
  useEffect(() => {
    const v = localStorage.getItem(KEY) as Variant | null;
    if (v && ["simple", "notion", "markdown"].includes(v)) setVariant(v);
  }, []);
  const tab = (v: Variant, label: string, icon: string) => (
    <button key={v} onClick={() => { setVariant(v); localStorage.setItem(KEY, v); }} className={`icon-label rounded-full px-3 py-1.5 text-xs font-semibold ${variant === v ? "bg-[var(--text)] text-white" : "border border-[var(--line)] hover:bg-[var(--accent-soft)]"}`}>
      <MaterialIcon name={icon} className="text-sm" />{label}
    </button>
  );
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {tab("simple", "Simple", "edit_note")}
        {tab("notion", "Notion", "view_kanban")}
        {tab("markdown", "Markdown", "markdown")}
      </div>
      {variant === "simple" && <SimpleRichEditor {...props} />}
      {variant === "notion" && <NotionEditor {...props} />}
      {variant === "markdown" && <MarkdownEditor {...props} />}
      <p className="text-xs text-[var(--muted)]">TipTap docs: Simple (StarterKit + UI) • Notion (slash “/” + drag) • Markdown (marked/turndown) → HTML</p>
    </div>
  );
}
