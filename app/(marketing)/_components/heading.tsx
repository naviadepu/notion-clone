"use client";

import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import {Spinner} from "@/components/spinner"
import Link from "next/link";

export const Heading = () => {
  const {isAuthenticated, isLoading} = useConvexAuth();
  return (
     <div className="max-w-3xl space-y-4">
  <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
    Your Ideas, Documents & Plans, Unified. Welcome to <br /> 
    <span className="underline">Notion</span>
    </h1>
    <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notion is the connected workspace where <br />
        better, faster work happens. 
    </h3>
    {isLoading && (
      <div className="2-full flex items-center justify-center">
      <Spinner size="lg"/>
      </div>
    )}
    {isAuthenticated && !isLoading && (
    <Button asChild>
    <Link href="/documents">
      <span className="flex items-center">
        Enter Notion
        <ArrowRight className="h-4 w-4 ml-2" />
      </span>
    </Link>
  </Button>  
    )}
    </div>
  );
};
