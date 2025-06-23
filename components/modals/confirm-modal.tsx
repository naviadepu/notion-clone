"use client";

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger

} from "@/components/ui/alert-dialog"
import { AlertDialogContent } from "@radix-ui/react-alert-dialog";
import { Children } from "react";

interface ConfirmModalPropps{
    children: React.ReactNode;
    onConfirm: () => void;
};
 
export const ConfirmModal = ({
    children,
    onConfirm
}: ConfirmModalPropps) => {
    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement , MouseEvent>) =>{
        e.stopPropagation();
        onConfirm();
    }

   return(
    <AlertDialog>
        <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
       <AlertDialogHeader></AlertDialogHeader>
        <AlertDialogTitle>
            Are you absolutely sure
        </AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. 
        </AlertDialogDescription>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={e => e.stopPropagation}>
                Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
                Confirm
            </AlertDialogAction>  
        </AlertDialogFooter>   
     </AlertDialogContent>
    </AlertDialog>
   ) 
}