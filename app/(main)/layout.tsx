"use client";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import {Navigation} from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";



const MainLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
const {isAuthenticated, isLoading} = useConvexAuth();
    if(isLoading){
        return(
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }
    if(!isAuthenticated){
        return redirect("/");
    }
     
    return ( 
    <div className="h-full flex dark:bg-black">
        <Navigation />
        <main className="flex h-full over">
            <SearchCommand />
        

            </main> 
            {children}
       
    </div>
    );
    
}


export default MainLayout;