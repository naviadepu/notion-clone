"use client";

import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";

import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { useBlockNote } from "@blocknote/react";

import { BlockNoteView } from "@blocknote/mantine";

import type {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";

interface EditorProps {
  initialContent?: string;
}

const Editor = ({
  initialContent,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  const editor: BlockNoteEditor = useBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div className="w-full flex justify-center px-4 md:px-8 lg:px-16 py-10">
      <div className="w-full max-w-4xl">
        <BlockNoteView
          editor={editor}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          className="bg-transparent shadow-none border-none"
        />
      </div>
    </div>
  );
  
};

export default Editor; 