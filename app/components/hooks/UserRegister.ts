import { create } from "zustand";

interface RegisterProps {
    isOpen : boolean 
    onOpen : () => void
    onClose : () => void
}

export const useRegisterModal = create<RegisterProps>((set) => ({
    isOpen : false,
    onOpen : () => set({ isOpen : true}),
    onClose : () => set({isOpen : false})
}))