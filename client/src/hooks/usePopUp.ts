import { create } from 'zustand';
import { PlayerStats, PlayerTableViewStats, Match } from '../types';

interface PoolModalState {
  isOpen: boolean;
  position: string | undefined;
  onOpen: (position?: string) => void;
  onClose: () => void;

  playersData: PlayerTableViewStats[];
  isLoadingPlayers: boolean;
  playersError: string | null;
  setPlayersData: (data: PlayerTableViewStats[]) => void;
  setIsLoadingPlayers: (isLoading: boolean) => void;
  setPlayersError: (error: string | null) => void;

  homeData: {
    topPlayers: PlayerStats[];
    upcomingMatches: Match[];
  } | null;
  isLoadingHomeData: boolean;
  homeDataError: string | null;
  setHomeData: (data: { topPlayers: PlayerStats[]; upcomingMatches: Match[]; }) => void;
  setIsLoadingHomeData: (isLoading: boolean) => void;
  setHomeDataError: (error: string | null) => void;
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

  homeData: null,
  isLoadingHomeData: false,
  homeDataError: null,
  setHomeData: (data) => set({ homeData: data }),
  setIsLoadingHomeData: (isLoading) => set({ isLoadingHomeData: isLoading }),
  setHomeDataError: (error) => set({ homeDataError: error }),
}));
