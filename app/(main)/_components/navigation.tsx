"use client";

import { ChevronsLeft, MenuIcon, PlusCircle, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import {UserItem} from "./user-item"
import { useMutation} from "convex/react";
import { api } from "@/convex/_generated/api";
import {Item} from "./item"
import {toast} from "sonner";
import {Search} from "lucide-react"
import { DocumentList } from "./documents-list";

export const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");
  const create = useMutation(api.documents.create);
  const isResizingRef = useRef(false);
  const sidebar = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // ✅ Added

  useEffect (() => {
    if(isMobile){
        handleCollapse();
    } else {
        resetWidth();
    }
}, [isMobile])


useEffect (() => {
    if(isMobile){
        handleCollapse();
    } 
}, [pathname, isMobile])


  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebar.current && navbarRef.current) {
      sidebar.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebar.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebar.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCollapse = () => {
    if (sidebar.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebar.current.style.width = "0px";
      navbarRef.current.style.setProperty("left", "0px");
      navbarRef.current.style.setProperty("width", "100%");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleExpand = () => {
    resetWidth(); // use same resetWidth logic
  };

  const handleCreate = () =>{
    const promise = create({title: "Untilted"});

    toast.promise(promise, {
      loading: "creating a new note...",
      success: "new note created!",
      error: "failed to create a new note"
    });
  };


  return (
    <>
      <aside
        ref={sidebar}
        className={cn(
          "group/sidebar h-screen bg-secondary overflow-y-auto relative flex flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isCollapsed && "w-0",
          !isCollapsed && "w-60"
        )}
      >
        {!isCollapsed && (
          <div
            role="button"
            onClick={handleCollapse}
            className={cn(
              "h-6 w-6 text-muted-foreground rounded-sm",
              "hover:bg-neutral-300 dark:hover:bg-neutral-600",
              "absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
              isMobile && "opacity-100"
            )}
          >
            <ChevronsLeft className="h-6 w-6" />
          </div>
        )}

        {!isCollapsed && (
          <>
            <div>
              <UserItem /> 
              <Item
              label="Search"
              icon={Search}
              onClick={() => {}}
              isSearch={true}
              />
              <Item
              label="Search"
              icon={Settings} 
              onClick={() => {}}
         
              />
              <Item 
              onClick={handleCreate}
              label="New Page"
               icon={PlusCircle} 
              />
            </div>

            <div className="mt-4">
            <DocumentList />
            
            
            </div>

            <div
              onMouseDown={handleMouseDown}
              className="opacity-0 group-hover/sidebar:opacity-100 
                transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
            />
          </>
        )}
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] transition-all ease-in-out duration-300",
          isCollapsed ? "left-0 w-full" : "left-60 w-[calc(100%-240px)]",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full flex items-center">
          {isCollapsed && (
            <button onClick={handleExpand}>
              <MenuIcon className="h-6 w-6 text-muted-foreground" />
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

