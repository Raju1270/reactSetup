import { create } from "zustand";
import { getStoredUser } from "@/utils/authUtils";

const useAuthStore = create((set) => ({
  user: getStoredUser(), // Initialize from localStorage
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
