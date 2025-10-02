import { create } from "zustand";

const getUserFromStorage = () => {
  const user = localStorage.getItem("user_cred");
  return user ? JSON.parse(user) : null;
};

const getTokenFromStorage = () => {
  const user = getUserFromStorage();
  return user?.accessToken || null;
};

export const useAuthStore = create((set, get) => ({
  user: getUserFromStorage(),
  token: getTokenFromStorage(),

  login: (data) => {
    const userData = {
      accessToken: data.accessToken,
      email: data.email,
      phoneNo: data.phoneNo,
      role: data.role,
      userId: data.userId,
      userName: data.userName,
    };

    localStorage.setItem("user_cred", JSON.stringify(userData));
    set({ user: userData, token: userData.accessToken });
  },

  logout: () => {
    localStorage.removeItem("user_cred");
    set({ user: null, token: null });
  },

  hasRole: (role) => {
    const { user } = get();
    return user?.role === role;
  },
}));
