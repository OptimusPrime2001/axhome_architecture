"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import styles from "./RichTextEditor.module.scss";

export interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  hasError?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Biên soạn câu chuyện ý tưởng kiến trúc, giải pháp vi khí hậu, vật liệu chế tác và kỹ thuật thi công...",
  hasError = false,
}) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [isLinkBarOpen, setIsLinkBarOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: styles.tiptapContent,
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        link: {
          openOnClick: false,
          autolink: true,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor: instance }) => {
      const html = instance.isEmpty ? "" : instance.getHTML();
      onChange(html);
    },
  });

  // Keep editor synced when form resets or loads an existing project
  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.isEmpty ? "" : editor.getHTML();
    if (value !== currentHtml) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  const handleOpenLinkBar = () => {
    if (!editor) return;
    const existingHref =
      (editor.getAttributes("link").href as string | undefined) ?? "";
    setLinkUrl(existingHref || "https://");
    setIsLinkBarOpen(true);
  };

  const handleApplyLink = () => {
    if (!editor) return;
    const trimmed = linkUrl.trim();
    if (!trimmed || trimmed === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: trimmed })
        .run();
    }
    setIsLinkBarOpen(false);
  };

  const handleToggleHtmlMode = () => {
    setIsHtmlMode((prev) => !prev);
    setIsLinkBarOpen(false);
  };

  return (
    <div
      className={`${styles.editorShell} ${hasError ? styles.editorInvalid : ""}`}
    >
      {/* Formatting Toolbar */}
      <div
        className={styles.toolbar}
        role="toolbar"
        aria-label="Định dạng bài viết"
      >
        <div className={styles.toolGroup}>
          <button
            type="button"
            disabled={!editor || isHtmlMode}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`${styles.toolBtn} ${editor?.isActive("bold") ? styles.toolBtnActive : ""}`}
            title="In đậm (Ctrl+B)"
            aria-label="In đậm"
          >
            <Bold size={14} />
          </button>

          <button
            type="button"
            disabled={!editor || isHtmlMode}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`${styles.toolBtn} ${editor?.isActive("italic") ? styles.toolBtnActive : ""}`}
            title="In nghiêng (Ctrl+I)"
            aria-label="In nghiêng"
          >
            <Italic size={14} />
          </button>

          <button
            type="button"
            disabled={!editor || isHtmlMode}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`${styles.toolBtn} ${editor?.isActive("underline") ? styles.toolBtnActive : ""}`}
            title="Gạch chân (Ctrl+U)"
            aria-label="Gạch chân"
          >
            <UnderlineIcon size={14} />
          </button>

          <span className={styles.divider} aria-hidden="true" />

          <button
            type="button"
            disabled={!editor || isHtmlMode}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`${styles.toolBtn} ${editor?.isActive("heading", { level: 2 }) ? styles.toolBtnActive : ""}`}
            title="Tiêu đề mục lớn (H2)"
          >
            H2
          </button>

          <button
            type="button"
            disabled={!editor || isHtmlMode}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`${styles.toolBtn} ${editor?.isActive("heading", { level: 3 }) ? styles.toolBtnActive : ""}`}
            title="Tiêu đề mục phụ (H3)"
          >
            H3
          </button>

          <span className={styles.divider} aria-hidden="true" />

          <button
            type="button"
            disabled={!editor || isHtmlMode}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`${styles.toolBtn} ${editor?.isActive("bulletList") ? styles.toolBtnActive : ""}`}
            title="Danh sách gạch đầu dòng"
            aria-label="Danh sách gạch đầu dòng"
          >
            <List size={15} />
          </button>

          <button
            type="button"
            disabled={!editor || isHtmlMode}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`${styles.toolBtn} ${editor?.isActive("orderedList") ? styles.toolBtnActive : ""}`}
            title="Danh sách đánh số"
            aria-label="Danh sách đánh số"
          >
            <ListOrdered size={15} />
          </button>

          <button
            type="button"
            disabled={!editor || isHtmlMode}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            className={`${styles.toolBtn} ${editor?.isActive("blockquote") ? styles.toolBtnActive : ""}`}
            title="Khối trích dẫn kỹ thuật / nghiệm thu"
            aria-label="Khối trích dẫn"
          >
            <Quote size={14} />
          </button>

          <span className={styles.divider} aria-hidden="true" />

          <button
            type="button"
            disabled={!editor || isHtmlMode}
            onClick={handleOpenLinkBar}
            className={`${styles.toolBtn} ${editor?.isActive("link") ? styles.toolBtnActive : ""}`}
            title="Chèn liên kết"
            aria-label="Chèn liên kết"
          >
            <Link2 size={15} />
          </button>

          {editor?.isActive("link") && !isHtmlMode && (
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className={styles.toolBtn}
              title="Gỡ liên kết"
              aria-label="Gỡ liên kết"
            >
              <Unlink size={14} />
            </button>
          )}

          <span className={styles.divider} aria-hidden="true" />

          <button
            type="button"
            disabled={!editor || isHtmlMode || !editor.can().undo()}
            onClick={() => editor?.chain().focus().undo().run()}
            className={styles.toolBtn}
            title="Hoàn tác"
            aria-label="Hoàn tác"
          >
            <Undo2 size={14} />
          </button>

          <button
            type="button"
            disabled={!editor || isHtmlMode || !editor.can().redo()}
            onClick={() => editor?.chain().focus().redo().run()}
            className={styles.toolBtn}
            title="Làm lại"
            aria-label="Làm lại"
          >
            <Redo2 size={14} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleToggleHtmlMode}
          className={`${styles.modeSwitchBtn} ${isHtmlMode ? styles.modeSwitchActive : ""}`}
        >
          <Code2 size={13} aria-hidden="true" />
          <span>{isHtmlMode ? "Chế độ trực quan" : "RICH HTML"}</span>
        </button>
      </div>

      {/* Inline URL Bar when inserting/editing links */}
      {isLinkBarOpen && !isHtmlMode && (
        <div className={styles.linkPromptBar}>
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://axhome.vn/..."
            className={styles.linkInput}
            aria-label="Đường dẫn liên kết"
          />
          <button
            type="button"
            onClick={handleApplyLink}
            className={styles.linkApplyBtn}
          >
            Áp dụng
          </button>
          <button
            type="button"
            onClick={() => setIsLinkBarOpen(false)}
            className={styles.linkCancelBtn}
          >
            Đóng
          </button>
        </div>
      )}

      {/* Visual Canvas or Raw HTML Source */}
      {isHtmlMode ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.htmlTextarea}
          aria-label="Mã nguồn HTML bài viết"
          spellCheck={false}
        />
      ) : (
        <div className={styles.canvasArea}>
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  );
};
