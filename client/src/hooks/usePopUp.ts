import { create } from 'zustand';
import { Player } from '../shared/data/mockTableData';

interface PoolModalState {
  isOpen: boolean;
  position: string | undefined;
  onOpen: (position?: string) => void;
  onClose: () => void;

  playersData: Player[];
  isLoadingPlayers: boolean;
  playersError: string | null;

  setPlayersData: (data: Player[]) => void;
  setIsLoadingPlayers: (isLoading: boolean) => void;
  setPlayersError: (error: string | null) => void;
}

export const usePoolModal = create<PoolModalState>((set) => ({
  isOpen: false,
  position: undefined,
  onOpen: (position?: string) => set({ isOpen: true, position }),
  onClose: () => set({ isOpen: false, position: undefined }),

  playersData: [],
  isLoadingPlayers: false,
  playersError: null,

  setPlayersData: (data) => set({ playersData: data }),
  setIsLoadingPlayers: (isLoading) => set({ isLoadingPlayers: isLoading }),
  setPlayersError: (error) => set({ playersError: error }),
}));
