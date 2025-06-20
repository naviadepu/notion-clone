"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import {Button} from "@/components/ui/button"
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser(); // Get the signed-in user (for displaying their name)
  const create = useMutation(api.documents.create);
  const onCreate = () =>{
    const promise = create ({title: "Untitled"})
    toast.promise(promise, {
      loading: "creating a new note",
      success: "new note created!",
      error: "failed to create new note"
    })
  }

  
  return (
    // Full-screen container centered vertically and horizontally
    <div className="h-screen w-full flex items-center justify-center">
      {/* Content box centered inside parent */}
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Light mode image */}
        <Image
          src="/empty.png"
          height={300}
          width={300}
          alt="Empty"
          className="dark:hidden"
        />

        {/* Dark mode image */}
        <Image
          src="/empty-dark.png"
          height={300}
          width={300}
          alt="Empty"
          className="hidden dark:block"
        />

        {/* Welcome message */}
        <h2 className="text-xl font-semibold">
          Welcome to {user?.firstName}'s Notion
        </h2>
        <Button onClick={onCreate}>
            <PlusCircle className="h-4 w-4 mr-2"/>
            Create a note
        </Button>
      </div>
    </div>
  );
};

export default DocumentsPage;
