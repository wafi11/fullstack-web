import { create } from 'zustand';

interface RentProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentModals = create<RentProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useRentModals;