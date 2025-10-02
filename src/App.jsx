import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/auth/Login";
import { ProtectedRoute } from "@/middleware/ProtectedRoute";
import Layout from "@/components/Layouts/AuthLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import MainLayout from "@/components/Layouts/MainLayout";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Public"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
