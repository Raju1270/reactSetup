import { apiService } from "@/services/apiService";
import { showError, showSuccess } from "@/utils/toast";
import { clearUser, storeUser } from "../utils/authUtils";

export const LoginUser = async ({ payload }) => {
  try {
    const response = await apiService.post("api/auth/login", payload);

    if (response?.success) {
      storeUser(response);
      showSuccess("Login successful!");
    }

    return response;
  } catch (error) {
    clearUser();
    showError(error.message || "Login failed");
    throw error;
  }
};
