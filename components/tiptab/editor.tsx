import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import EditorToolbar from "./toolbar/editor-toolbar"

import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import Image from "@tiptap/extension-image"

const extensions = [
  Table.configure({
    HTMLAttributes: {
      class: "tiptap-editor-table",
    },
  }),
  TableRow,
  TableHeader,
  TableCell,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  // Image,
]

interface EditorProps {
  content: string
  placeholder?: string
  onChange?: (data: any, html: string) => void
  // onAddImage?: () => void
  useImage?: boolean
}

const Editor = ({ content, placeholder, onChange, useImage = false }: EditorProps) => {
  const editorExtensions = [...extensions]
  if (useImage) {
    editorExtensions.push(Image)
  }
  const editor = useEditor({
    extensions: editorExtensions,
    content: content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        const text = editor.getText()
        onChange(editor.getJSON(), text ? editor.getHTML() : "")
      }
    },
  })

  if (!editor) return <></>

  return (
    <div className='prose dark:prose-invert w-full max-w-none border border-input bg-background'>
      <EditorToolbar editor={editor} useImage={useImage} />
      <div className='editor'>
        <EditorContent editor={editor} placeholder={placeholder} className='p-2' />
      </div>
    </div>
  )
}

export default Editor
