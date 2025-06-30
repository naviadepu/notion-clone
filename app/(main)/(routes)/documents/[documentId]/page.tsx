"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Title } from "@/app/(main)/_components/title";


const DocumentIdPage = () => {
  const params = useParams();
  const documentId = params?.documentId as Id<"documents"> | undefined;

  const document = useQuery(
    api.documents.getById,
    documentId ? { documentId } : "skip"
  );

  if (document === undefined) {
    return <p>Loading...</p>;
  }

  if (document === null) {
    return <p>Document not found</p>;
  }

  return (
    <div className="p-4">
      <Title initialData={document} />
      {/* You can add your editor here next */}
      {/* <Editor documentId={document._id} /> */}
    </div>
  );
};

export default DocumentIdPage;
