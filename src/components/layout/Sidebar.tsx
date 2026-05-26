import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  CreditCard,
  LifeBuoy,
  BrainCircuit,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/src/store/useAuthStore";
import { cn } from "@/src/lib/utils";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Projects", href: "/projects", icon: FolderKanban },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <div
      className={cn(
        "hidden md:flex flex-col w-64 border-r border-white/10 bg-zinc-950 min-h-screen relative p-4",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-2 mb-8">
        <BrainCircuit className="w-6 h-6 text-indigo-500" />
        <span className="text-lg font-bold font-sans tracking-tight text-white">
          AI Startup Gen
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-white",
              )
            }
          >
            <item.icon
              className="mr-3 flex-shrink-0 w-5 h-5"
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-1 pt-4 border-t border-white/10">
        <a
          href="#"
          className="group flex items-center px-3 py-2 text-sm font-medium text-gray-400 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
        >
          <LifeBuoy className="mr-3 flex-shrink-0 w-5 h-5" />
          Support
        </a>
        <button
          onClick={handleLogout}
          className="w-full group flex items-center px-3 py-2 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="mr-3 flex-shrink-0 w-5 h-5" />
          Log out
        </button>
      </div>

      {/* Credit balance small card */}
      <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="text-xs text-gray-400 mb-1">Available Credits</div>
        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-white">10</span>
          <span className="text-sm text-gray-500 mb-0.5">/ 25</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full mt-3">
          <div
            className="bg-indigo-500 h-1.5 rounded-full"
            style={{ width: "40%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
