import {create} from "zustand";

type coverImageStore = {
    url: string | undefined;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

};

export const useCoverImage = create<coverImageStore>((set => ({
    isOpen:false,
    onOpen:() => set({isOpen:true}),
    onClose: () => set({isOpen: false})
})))