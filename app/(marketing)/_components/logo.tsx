import Image from "next/image";
import {Poppins} from "next/font/google"
import {cn} from "@/lib/utils" //append tailwind elements

const font = Poppins({
    subsets:["latin"],
    weight:["400", "600"]
})

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image 
            src="/notion-logo.png"
            height="40"
            width="40"
            alt="logo"
            />
            <p className={cn("font-semibold",font.className)}>
                Notion
            </p>
        </div>
    )
}