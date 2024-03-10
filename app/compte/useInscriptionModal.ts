import { create } from 'zustand';

interface IscriptionModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const InscriptionModal = create<IscriptionModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default InscriptionModal;