"use client";

import React from "react";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef, useImperativeHandle } from "react";

// import { TextStyleKit } from "@tiptap/extension-text-style";

// Editor extensions
const extensions = [StarterKit];

// Menu bar component
function MenuBar({ editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
      isStrike: ctx.editor?.isActive("strike") ?? false,
      canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
      isCode: ctx.editor?.isActive("code") ?? false,
      canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
      canClearMarks: ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
      isParagraph: ctx.editor?.isActive("paragraph") ?? false,
      isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
      isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
      isBulletList: ctx.editor?.isActive("bulletList") ?? false,
      isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
      isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
      isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
      canUndo: ctx.editor?.can().chain().undo().run() ?? false,
      canRedo: ctx.editor?.can().chain().redo().run() ?? false,
    }),
  });

  if (!editor) return null;

  const buttonStyle = (active) => ({
    padding: "4px 8px",
    marginRight: "4px",
    marginBottom: "4px",
    cursor: "pointer",
    border: "1px solid #ccc",
    backgroundColor: active ? "#3399ff" : "#eee",
    color: active ? "#fff" : "#000",
  });

  return (
    <div style={{ marginBottom: "0px", display: "flex", flexWrap: "wrap" }}>
      {/* Marks */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        style={buttonStyle(editorState.isBold)}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        style={buttonStyle(editorState.isItalic)}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        style={buttonStyle(editorState.isStrike)}
      >
        Strike
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        style={buttonStyle(editorState.isCode)}
      >
        Code
      </button>

      {/* Paragraph & headings */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        style={buttonStyle(editorState.isParagraph)}
      >
        Paragraph
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        style={buttonStyle(editorState.isHeading1)}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        style={buttonStyle(editorState.isHeading2)}
      >
        H2
      </button>

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        style={buttonStyle(editorState.isBulletList)}
      >
        Bullet list
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        style={buttonStyle(editorState.isOrderedList)}
      >
        Ordered list
      </button>

      {/* Code block / blockquote */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        style={buttonStyle(editorState.isCodeBlock)}
      >
        Code block
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        style={buttonStyle(editorState.isBlockquote)}
      >
        Blockquote
      </button>

      {/* Misc */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        style={buttonStyle(editorState.isBlockquote)}
      >
        Horizontal rule
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        style={buttonStyle(editorState.isBlockquote)}
      >
        Hard break
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        style={buttonStyle(editorState.canUndo)}
      >
        Undo
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        style={buttonStyle(editorState.canRedo)}
      >
        Redo
      </button>
    </div>
  );
}

// Main editor component
const BlogEditor = forwardRef(function BlogEditor(props, ref) {
  const editor = useEditor({
    extensions,
    content: `
      <h2>Your blog content goes here...</h2>
      <p>This is a rich text editor</p>
    `,
    immediatelyRender: false,
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML(),
    getText: () => editor?.getText(),
  }));

  // Inline CSS for editor content (converted from your SCSS)
  const editorStyles = `
    .tiptap * { box-sizing: border-box;  }
    .tiptap ul, .tiptap ol { padding-left: 1rem; margin: 1rem 0; }
    .tiptap li p { margin: 0.25em 0; }
    .tiptap h1, .tiptap h2, .tiptap h3, .tiptap h4, .tiptap h5, .tiptap h6 { line-height: 1.1; margin: 1rem 0; }
    .tiptap h1 { font-size: 1.4rem; margin-top: 2rem; }
    .tiptap h2 { font-size: 1.2rem; margin-top: 1.5rem; }
    .tiptap h3 { font-size: 1.1rem; }
    .tiptap code { background-color: #ddd; border-radius: 0.25rem; padding: 0.2em 0.3em; font-size: 0.85rem; }
    .tiptap pre { background: #333; color: #fff; padding: 0.75rem 1rem; border-radius: 0.25rem; font-family: monospace; }
    .tiptap blockquote { border-left: 3px solid #ccc; padding-left: 1rem; margin: 1rem 0; }
    .tiptap hr { border: none; border-top: 1px solid #ccc; margin: 2rem 0; }
  `;

  return (
    <div style={{ maxWidth: "768px" }}>
      <style>{editorStyles}</style>
      <MenuBar editor={editor} />
      <EditorContent
        className="tiptap"
        editor={editor}
        style={{
          border: "2px solid #000",
          borderRadius: "4px",
          padding: "8px",
          minHeight: "150px",
          outline: "none",
          maxWidth: "768px",
        }}
      />
    </div>
  );
});

export default BlogEditor;
