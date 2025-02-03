// components/custom-editor.js
"use client"; // only in App Router

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Heading
} from "ckeditor5";
import { FormatPainter } from "ckeditor5-premium-features";
import { useTheme } from "next-themes";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

function CustomEditor({ content }) {
  const { theme } = useTheme();
  // Handle editor content changes
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();

    content(data);
  };

  return (
    <div
      className={`ckeditor-container ${
        theme === "dark" ? "ckeditor-dark" : "ckeditor-light"
      }`}
    >
      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey:
            "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Mzk3NTAzOTksImp0aSI6IjgzNmYwMmIzLWIxMjYtNDljMC1iMjU2LWU5MzQ1ZTVmMDZkZiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImE1OTAyOTE2In0.ssbXsLgubTQKAKdFk0_WfJBuUmBkK_yG349aBkzaBOLjbjcLxQcV6E1dAbWb78YCN3SAl4e9BS5bifCc57v3SQ", // Or 'GPL'.
          plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
          toolbar: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "|",
            "formatPainter",
            "|",
            "heading"
          ],
          initialData: "<p>This is the dummy conent</p>"
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default CustomEditor;
