import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/src/store/useAuthStore";
import { BrainCircuit } from "lucide-react";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <BrainCircuit className="w-8 h-8 text-indigo-500 animate-pulse" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
