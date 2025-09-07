import { showSuccess } from "@/utils/toast";

export const getStoredUser = () => {
  const userCred = localStorage.getItem("user_cred");
  return userCred ? JSON.parse(userCred) : null;
};

export const storeUser = (data) => {
  
  const userCredentials = {
    token: data.token,
    roleType: data.roleType,
    user: data.user || null,
  };

  localStorage.setItem("user_cred", JSON.stringify(userCredentials));
};

export const clearUser = () => {
  localStorage.removeItem("user_cred");
};

export const logoutUser = () => {
  clearUser();
  showSuccess("Logged out successfully!");
};

export const isAuthenticated = () => {
  const user = getStoredUser();
  return !!user?.token;
};
