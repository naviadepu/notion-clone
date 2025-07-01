"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { useCoverImage } from "@/hooks/use-cover-image";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({
    url,
    preview,
  }: CoverImageProps) => {
    const { edgestore } = useEdgeStore();
    const params = useParams();
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);
  
    const onRemove = async () => {
      if (url) {
        await edgestore.publicFiles.delete({ url });
      }
      removeCoverImage({
        id: params.documentId as Id<"documents">
      });
    };
  
    return (
      <div className={cn(
        "relative w-full h-[35vh] overflow-hidden group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}>
        {!!url && (
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              src={url}
              alt="Cover"
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
  
        {url && !preview && (
          <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2 z-10">
            <Button
              onClick={() => {}}
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Change cover
            </Button>
            <Button
              onClick={onRemove}
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        )}
      </div>
    );
  }
  

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="w-full h-[12vh]" />
  )
}