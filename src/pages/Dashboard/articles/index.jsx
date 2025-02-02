"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
// import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useState } from "react";
const ArticleScreen = () => {
  const editor = useEditor({
    extensions: [StarterKit,
      Bold,
      Italic,
      // Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: "<p>Hello world!</p>",
    onUpdate: ({ editor }) => {
      console.log("Editor data:", editor.getHTML());
    },
  });
  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <h2 className="text-[26px] font-medium mb-8 dark:text-white text-black">
          Add New Articles
        </h2>
        <div className="flex flex-row flex-wrap justify-between">
          <div className="flex flex-col w-[49%]">
            <label className="dark:text-white text-black font-inter font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Article title"
              className="h-[50px] border border-gray-600 rounded-[12px] pl-3"
            />
          </div>
          <div className="flex flex-col w-[49%]">
            <label className="dark:text-white text-black font-inter font-medium mb-2">
              Category
            </label>
            <select className="h-[50px] border dark:text-white text-black border-gray-600 rounded-[12px] pl-3">
              <option>Stock</option>
              <option>Crypto</option>
              <option>Forex</option>
            </select>
          </div>
          <div className="flex flex-col w-[49%] mt-10">
            <label className="dark:text-white text-black font-inter font-medium mb-2">
              Written By
            </label>
            <input
              type="text"
              placeholder="Author name"
              className="h-[50px] border border-gray-600 rounded-[12px] pl-3"
            />
          </div>
          <div className="flex flex-col w-[49%] mt-10">
            <label className="dark:text-white text-black font-inter font-medium mb-2">
              Article Image
            </label>
            <input type="file" className="h-[50px] rounded-[12px] pl-3" />
          </div>
          <div className="flex flex-col w-[100%] mt-10">
            <label className="dark:text-white text-black font-inter font-medium mb-2">
              Article Content
            </label>
            <div className="p-5 bg-white border border-gray-300 rounded-md">
      {/* Toolbar */}
      <div className="mb-3 flex gap-2 border-b pb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
        >
          U
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""
          }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""
          }`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive("bulletList") ? "bg-gray-300" : ""
          }`}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive("orderedList") ? "bg-gray-300" : ""
          }`}
        >
          1. List
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleScreen;
