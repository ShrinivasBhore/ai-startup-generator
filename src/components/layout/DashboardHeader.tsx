import { useState } from 'react';
import { Menu, Bell, User, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/src/store/useAuthStore';
import { motion, AnimatePresence } from 'motion/react';

export function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-400 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
        {/* Can put a search bar here if desired */}
        <h1 className="text-xl font-bold text-white hidden md:block">Workspace</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full border border-black"></span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 pl-2 pr-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-medium">
              {user?.name?.charAt(0) || <User className="w-4 h-4" />}
            </div>
            <span className="text-sm font-medium text-gray-200 hidden sm:block">{user?.name || 'User'}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 rounded-xl bg-zinc-900 border border-white/10 shadow-2xl py-1 overflow-hidden"
              >
                <div className="px-4 py-2 border-b border-white/10">
                  <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
                <div className="py-1">
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">Profile Settings</a>
                  <a href="/billing" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">Billing</a>
                </div>
                <div className="py-1 border-t border-white/10">
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
