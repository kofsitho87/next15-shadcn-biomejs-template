import { cn } from "@/lib/utils"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"

interface ViewerProps {
  content: string
  style?: "default" | "prose"
}

const Viewer = ({ content, style }: ViewerProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content,
    editable: false,
  })

  if (!editor) return <></>

  const className = style === "prose" ? "prose-mt-0 prose max-w-none dark:prose-invert" : ""

  return (
    <article className={cn(className)}>
      <EditorContent editor={editor} readOnly={true} />
    </article>
  )
}

export default Viewer
