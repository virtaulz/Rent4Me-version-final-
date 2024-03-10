import { create } from 'zustand';

interface ConnexionModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ConnexionModal = create<ConnexionModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default ConnexionModal;