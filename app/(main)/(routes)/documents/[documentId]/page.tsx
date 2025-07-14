"use client";

import React, { use } from "react";
import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/components/editor";
import { SingleImageDropzone } from "@/components/single-image-dropzone";

export default function Page({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = use(params);

  const document = useQuery(api.documents.getById, {
    documentId: documentId as Id<"documents">,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: documentId as Id<"documents">,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        Loading...
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40 relative">
      <div className="fixed top-0 left-0 w-full z-0">
        <Cover url={document.coverImage} />
      </div>
      <div className="relative z-10 pt-[200px] md:pt-[280px] lg:pt-[320px]">
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
          <Toolbar initialData={document} />
          <Editor initialContent={document.content} />
        </div>
      </div>
    </div>
  );
};
