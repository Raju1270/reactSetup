import Demo from "@/components/Demo";
import useAuthStore from "@/stores/useAuthStore";
import { Toaster } from "react-hot-toast";
import { logoutUser } from "@/utils/authUtils";
import { toastConfig } from "@/utils/toast";

function App() {
  const { user, clearUser } = useAuthStore();

  const handleLogout = () => {
    logoutUser();
    clearUser();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="mx-auto max-w-md">
          <Demo />

          {user ? (
            <div className="mt-4 rounded bg-white p-4 shadow">
              <p className="text-lg">
                Welcome, <span className="font-semibold">{user.name}</span>!
              </p>
              <button
                onClick={handleLogout}
                className="mt-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <p className="mt-4 text-center text-gray-600">Please log in to continue</p>
          )}
        </div>
      </div>
      <Toaster toastOptions={toastConfig} />
    </>
  );
}

export default App;
