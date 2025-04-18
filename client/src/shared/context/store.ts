import { create } from "zustand";

interface AppState {
    currentUser: any;
    setCurrentUser: (user: any) => void;
    userBets: any[];
    setUserBets: (bets: any[]) => void;
    pointsBalance: number;
    setPointsBalance: (balance: number) => void;
    // Add other state properties and setters
}

const useAppStore = create<AppState>((set) => ({
    currentUser: null,
    setCurrentUser: (currentUser) => set({ currentUser }),
    userBets: [],
    setUserBets: (userBets) => set({ userBets }),
    pointsBalance: 0,
    setPointsBalance: (pointsBalance) => set({ pointsBalance }),
    // Initialize other state
}));

export default useAppStore;
