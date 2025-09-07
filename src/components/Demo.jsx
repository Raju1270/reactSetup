import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/stores/useAuthStore";
import { LoginUser } from "@/services/authServices";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getStoredUser } from "@/utils/authUtils";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setUser = useAuthStore((state) => state.setUser);

  const { mutate: login, isPending } = useMutation({
    mutationFn: LoginUser,
    onSuccess: () => {
      const storedUser = getStoredUser();
      setUser(storedUser);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data) => {
    // Debug: Let's see exactly what react-hook-form gives us
    console.log("Raw form data from react-hook-form:", data);
    console.log("Form data keys:", Object.keys(data));
    console.log("Form data entries:", Object.entries(data));
    
    // Also check the actual form elements
    const formElements = document.querySelectorAll('input[name]');
    console.log("Actual form input elements:", Array.from(formElements).map(el => ({
      name: el.name,
      value: el.value,
      type: el.type
    })));
    
    const cleanData = {
      adminId: data.adminId || data.AdminId,
      password: data.password || data.Password,
    };
    
    console.log("Cleaned form data:", cleanData);
    login({ payload: cleanData });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md"
      autoComplete="off"
    >
      <h2 className="mb-6 text-xl font-bold text-gray-800">Login</h2>

      <div className="mb-4">
        <input
          {...register("adminId", {
            required: "User ID is required",
          })}
          placeholder="User ID"
          className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          disabled={isPending}
          autoComplete="off"
        />
        {errors.adminId && <p className="mt-1 text-sm text-red-500">{errors.adminId.message}</p>}
      </div>

      <div className="mb-6">
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          })}
          type="password"
          placeholder="Password"
          className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          disabled={isPending}
          autoComplete="new-password"
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center rounded bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <>
            <LoadingSpinner size="small" color="white" />
            <span className="ml-2">Logging in...</span>
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}

export default LoginForm;
