"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { API_URL } from "@/lib/api";
import { MaterialIcon } from "@/components/material-icon";

type Props = {
  value: string;
  onChange: (html: string) => void;
  token: string | null;
};

export function RichTextEditor({ value, onChange, token }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        codeBlock: { HTMLAttributes: { class: "rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4" } },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-xl border border-[var(--line)] max-w-full" },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-[var(--accent)] underline", target: "_blank", rel: "noopener noreferrer" },
      }),
      Placeholder.configure({ placeholder: "Write your entry… Use headings, lists, quotes, code and images." }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[340px] max-h-[520px] overflow-auto p-4 text-[15px] leading-relaxed text-[var(--text)] outline-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[var(--text)] prose-h1:text-3xl prose-h1:leading-tight prose-h2:text-2xl prose-h2:leading-tight prose-h3:text-xl prose-h3:leading-snug prose-h4:text-base prose-h4:uppercase prose-h4:tracking-[0.08em] prose-p:my-3 prose-a:text-[var(--accent)] prose-blockquote:border-l-2 prose-blockquote:border-[var(--line)] prose-blockquote:pl-4 prose-blockquote:italic prose-pre:my-4 prose-pre:rounded-xl prose-pre:border prose-pre:border-[var(--line)] prose-pre:bg-[var(--surface)] prose-img:rounded-xl prose-img:border prose-img:border-[var(--line)] prose-hr:my-6 prose-li:my-1 prose-ul:list-disc prose-ol:list-decimal",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value || "<p></p>");
    }
  }, [value, editor]);

  if (!editor) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!token) {
      alert("Not authenticated");
      return;
    }
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const url = data.url.startsWith("http") ? data.url : `${API_URL}${data.url}`;
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      e.target.value = "";
    }
  };

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = prompt("URL (https://...):", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const btn = (active: boolean) => `rounded-lg px-2 py-1 text-sm hover:bg-[var(--accent-soft)] ${active ? "bg-[var(--accent-soft)] text-[var(--accent)]" : ""}`;
  const iconBtn = (active: boolean) => `rounded-lg p-1.5 hover:bg-[var(--accent-soft)] ${active ? "bg-[var(--accent-soft)] text-[var(--accent)]" : ""}`;

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]">
      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--line)] bg-[var(--surface)]/50 p-2">
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => editor.chain().focus().undo().run()} className="rounded-lg p-1.5 hover:bg-[var(--accent-soft)]" title="Undo">
            <MaterialIcon name="undo" className="text-base" />
          </button>
          <button type="button" onClick={() => editor.chain().focus().redo().run()} className="rounded-lg p-1.5 hover:bg-[var(--accent-soft)]" title="Redo">
            <MaterialIcon name="redo" className="text-base" />
          </button>
        </div>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />

        <div className="flex items-center gap-1">
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btn(editor.isActive("heading", { level: 1 }))} title="H1">
            H1
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))} title="H2">
            H2
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))} title="H3">
            H3
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={btn(editor.isActive("heading", { level: 4 }))} title="H4">
            H4
          </button>
          <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={btn(editor.isActive("paragraph"))} title="Paragraph">
            P
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={iconBtn(editor.isActive("blockquote"))} title="Quote">
            <MaterialIcon name="format_quote" className="text-base" />
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={iconBtn(editor.isActive("codeBlock"))} title="Code block">
            <MaterialIcon name="code" className="text-base" />
          </button>
        </div>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />

        <div className="flex items-center gap-1">
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))} title="Bold">
            <span className="font-bold">B</span>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))} title="Italic">
            <span className="italic">I</span>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive("strike"))} title="Strike">
            <span className="line-through">S</span>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={btn(editor.isActive("code"))} title="Inline code">
            {"</>"}
          </button>
        </div>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />

        <div className="flex items-center gap-1">
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={iconBtn(editor.isActive("bulletList"))} title="Bullet list">
            <MaterialIcon name="format_list_bulleted" className="text-base" />
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={iconBtn(editor.isActive("orderedList"))} title="Ordered list">
            <MaterialIcon name="format_list_numbered" className="text-base" />
          </button>
          <button type="button" onClick={setLink} className={iconBtn(editor.isActive("link"))} title="Link">
            <MaterialIcon name="link" className="text-base" />
          </button>
          <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} className="rounded-lg p-1 hover:bg-[var(--accent-soft)]" title="Unlink">
            <MaterialIcon name="link_off" className="text-base" />
          </button>
          <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="rounded-lg p-1 hover:bg-[var(--accent-soft)]" title="Divider">
            <MaterialIcon name="horizontal_rule" className="text-base" />
          </button>
        </div>
        <span className="mx-1 h-6 w-px bg-[var(--line)]" />

        <div className="flex items-center gap-1">
          <label className="icon-label cursor-pointer rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-1.5 text-xs font-semibold hover:bg-[var(--accent-soft)]">
            <MaterialIcon name="image" className="text-base" />
            Image
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
          <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="rounded-lg px-2 py-1 text-xs hover:bg-[var(--accent-soft)]" title="Clear">
            Clear
          </button>
        </div>
      </div>

      <EditorContent editor={editor} />

      <style>{`.tiptap p.is-editor-empty:first-child::before{content:attr(data-placeholder);float:left;color:var(--muted);opacity:.5;pointer-events:none;height:0}.tiptap{outline:none}`}</style>

      <div className="flex items-center justify-between border-t border-[var(--line)] px-3 py-2 text-xs text-[var(--muted)]">
        <span>TipTap • H1–H4 • lists • quote • code • images → Hetzner</span>
        <span className="hidden font-mono sm:inline">HTML saved</span>
      </div>
    </div>
  );
}
