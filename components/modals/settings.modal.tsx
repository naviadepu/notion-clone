"use client"



import {
    Dialog,
    DialogContent,
    DialogHeader

} from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ModeToggle } from "../mode-toggle";

export const SettingsModal = () => {
    const settings = useSettings();
    return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>

        <DialogContent>
            <DialogHeader className="border-b pb-3 ">
                <h2 className="text-lg font-medium">
                    My settings
                </h2>

            </DialogHeader>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-1">
                    <Label>
                        Appearance
                    </Label>
                    
                    <span className="text-[0.8rem] text-muted-foreground">
                    Customize how notion looks on your device
                        </span>    

                </div>
                <ModeToggle/>
            </div>
        </DialogContent>  

    </Dialog> 
        )
}

