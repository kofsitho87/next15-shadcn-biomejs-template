import type React from "react"
import { useRef } from "react"
import type { Editor } from "@tiptap/react"
import { Bold, Code, ImagePlus, Italic, List, ListOrdered, Minus, Quote, Redo, Strikethrough, Undo } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, Toolbar } from "./custom-toolbar"
import { FormatType } from "./format-type"
import { Button } from "@/components/ui/button"

interface EditorToolbarProps {
  editor: Editor
  useImage?: boolean
}

const EditorToolbar = ({ editor, useImage = false }: EditorToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleAddImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || files.length === 0) return

    for (const file of Array.from(files)) {
      const url = URL.createObjectURL(file)
      editor.chain().focus().setImage({ src: url, alt: "local", title: file.name }).run()
    }
  }

  return (
    <Toolbar className='m-0 flex items-center justify-between p-2' aria-label='Formatting options'>
      <ToggleGroup className='flex flex-row items-center' type='multiple'>
        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}
        >
          <Bold className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
          value='italic'
        >
          <Italic className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive("strike")}
        >
          <Strikethrough className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          pressed={editor.isActive("bulletList")}
        >
          <List className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          pressed={editor.isActive("orderedList")}
        >
          <ListOrdered className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
          pressed={editor.isActive("codeBlock")}
        >
          <Code className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          pressed={editor.isActive("blockquote")}
        >
          <Quote className='h-4 w-4' />
        </Toggle>

        <Toggle size='sm' className='mr-1' onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className='h-4 w-4' />
        </Toggle>

        <FormatType editor={editor} />

        {useImage && (
          <>
            <Button
              size='sm'
              variant='outline'
              className='ml-1'
              type='button'
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className='h-4 w-4' />
            </Button>
            <input ref={fileInputRef} type='file' className='hidden' accept='image/*' onChange={handleAddImage} />
          </>
        )}
      </ToggleGroup>

      <ToggleGroup className='invisible flex flex-row items-center sm:visible' type='multiple'>
        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className='h-4 w-4' />
        </Toggle>
      </ToggleGroup>
    </Toolbar>
  )
}

export default EditorToolbar
