"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { API_URL } from "@/lib/api";

type Props = { value: string; onChange: (html: string) => void; token: string | null };

export function RichTextEditor({ value, onChange, token }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: "rounded-xl border border-[var(--line)] max-w-full" } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-[var(--accent)] underline" } }),
      Placeholder.configure({ placeholder: "Write… TipTap supports Markdown shortcuts: # H1, ## H2, - list, > quote, ``` code. Paste or drag images." }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "tiptap prose max-w-none min-h-[420px] p-6 text-[15px] leading-relaxed outline-none prose-headings:font-display prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-img:rounded-xl focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) editor.commands.setContent(value || "");
  }, [value, editor]);

  if (!editor) return null;

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    const form = new FormData(); form.append("image", file);
    const res = await fetch(`${API_URL}/api/upload`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
    const data = await res.json();
    const url = data.url.startsWith("http") ? data.url : `${API_URL}${data.url}`;
    editor.chain().focus().setImage({ src: url }).run();
    e.target.value = "";
  };

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]">
      <EditorContent editor={editor} />
      <div className="flex items-center justify-between border-t border-[var(--line)] px-3 py-2 text-xs text-[var(--muted)]">
        <span>TipTap full canvas • Markdown shortcuts • drag & drop images → Hetzner</span>
        <label className="cursor-pointer rounded-full border bg-white px-3 py-1 hover:bg-[var(--accent-soft)]">Image<input type="file" accept="image/*" className="hidden" onChange={handleImage} /></label>
      </div>
      <style>{`.tiptap p.is-editor-empty:first-child::before{content:attr(data-placeholder);float:left;color:var(--muted);opacity:.4;pointer-events:none;height:0}.tiptap{outline:none} .tiptap :first-child{margin-top:0}`}</style>
    </div>
  );
}
