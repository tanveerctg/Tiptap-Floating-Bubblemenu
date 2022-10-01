// src/Tiptap.jsx
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
          <p>
            This is an example of a Medium-like editor. Enter a new line and some buttons will appear.
          </p>
          <p></p>
        `,
  });
  const [isEditable, setIsEditable] = React.useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={isEditable}
          onChange={() => setIsEditable(!isEditable)}
        />
        Editable
      </div>
      {editor && (
        <>
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              h1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              h2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              bullet list
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : ""}
            >
              ordered list
            </button>
          </FloatingMenu>
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "is-active" : ""}
            >
              code
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              strike
            </button>
          </BubbleMenu>
        </>
      )}
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
