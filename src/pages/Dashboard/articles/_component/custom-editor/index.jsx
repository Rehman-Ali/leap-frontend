'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BulletList, OrderedList, ListItem } from '@tiptap/extension-list'
import './style.css'

function CustomEditor({ content, initialContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      // This triggers whenever there is a change in the editor content
      const updatedContent = editor.getHTML() // Get the updated HTML content
      content(updatedContent) // Call the onChange callback to pass the updated content back to the parent
    },
  })

  if (!editor) {
    return null // Ensure the editor is ready before rendering
  }

  // Handle actions for bold, italic, heading, and lists
  const handleBold = () => editor.chain().focus().toggleBold().run()
  const handleItalic = () => editor.chain().focus().toggleItalic().run()
  // const handleHeading = (level) => {
  //   editor.chain().focus().setNode('heading', { level }).run()
  // }
  const handleHeading = (level) => editor.chain().focus().toggleHeading({ level }).run()
  // const handleList = (type) => {
  //   if (type === 'bullet') {
  //     editor.chain().focus().toggleList(BulletList).run()
  //   } else if (type === 'ordered') {
  //     editor.chain().focus().toggleList(OrderedList).run()
  //   }
  // }

  const handleUndo = () => editor.chain().focus().undo().run()
  const handleRedo = () => editor.chain().focus().redo().run()

  // Check if the editor has active formatting (e.g., bold, italic, heading, list)
  const isBoldActive = editor.isActive('bold')
  const isItalicActive = editor.isActive('italic')
  const isHeadingActive = (level) => editor.isActive('heading', { level })
  const isBulletListActive = editor.isActive(BulletList)
  const isOrderedListActive = editor.isActive(OrderedList)

  return (
    <div>
      {/* Toolbar */}
      <div className="toolbar  space-x-2 border-gray-700 border rounded">
       
        <button
          onClick={handleBold}
          className={`btn ${isBoldActive ?  "bg-darkPrimary" : ''} p-2 rounded-[5px]`}
        >
          Bold
        </button>
        <button
          onClick={handleItalic}
          className={`btn ${isItalicActive ? 'bg-darkPrimary' : ''}  p-2 rounded-[5px]`}
        >
          Italic
        </button>
        <button
          onClick={() => handleHeading(1)}
          className={`btn ${isHeadingActive(1) ? 'bg-darkPrimary' : ''}  p-2 rounded-[5px]`}
        >
          H1
        </button>
        <button
          onClick={() => handleHeading(2)}
          className={`btn ${isHeadingActive(2) ? 'bg-darkPrimary' : ''}  p-2 rounded-[5px]`}
        >
          H2
        </button>
        {/* <button
          onClick={() => handleList('bullet')}
          className={`btn ${isBulletListActive ? 'bg-darkPrimary' : ''}  p-2 rounded-[5px]`}
        >
          Bullet List
        </button>
        <button
          onClick={() => handleList('ordered')}
          className={`btn ${isOrderedListActive ? 'bg-darkPrimary' : ''}  p-2 rounded-[5px]`}
        >
          Ordered List
        </button> */}
        <button onClick={handleUndo} className="btn">Undo</button>
        <button onClick={handleRedo} className="btn">Redo</button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="border border-gray-700  p-4 rounded" />
    </div>
  )
}

export default CustomEditor
