import { create } from "zustand";

interface PopUpStore {
    isOpen: boolean;
    triggerClose: boolean;
    setTriggerClose: (value: boolean) => void;
    onOpen: () => void;
    onClose: () => void;
}

const createPopUpStore = () => create<PopUpStore>((set) => ({
    isOpen: false,
    triggerClose: false,
    setTriggerClose: (value: boolean) => set({ triggerClose: value }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export const usePoolModal = createPopUpStore();