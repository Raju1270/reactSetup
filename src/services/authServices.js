import { apiService } from "@/services/apiService";
import { showError, showSuccess } from "@/utils/toast";
import { useAuthStore } from "../store/AuthStore";
import { parseError } from "../utils/parseError";

export const LoginService = async (payload) => {
  try {
    const response = await apiService.post("api/auth/login", payload);

    if (response?.success && response?.accessToken) {
      useAuthStore.getState().login(response);
      showSuccess("Login successful!");

      return response;
    } else {
      showError("Login failed: Invalid response from server");
      throw new Error("Invalid login response");
    }
  } catch (error) {
    showError(parseError(error));
    useAuthStore.getState().logout();
    throw error;
  }
};

export const SignupService = async (payload) => {
  try {
    const response = await apiService.post("api/auth/signup", payload);

    if (response?.success && response?.accessToken) {
      useAuthStore.getState().login(response);
      showSuccess("Signup successful!");

      return response;
    } else {
      showError("Signup failed: Invalid response from server");
      throw new Error("Invalid signup response");
    }
  } catch (error) {
    showError(parseError(error));
    useAuthStore.getState().logout();
    throw error;
  }
};
