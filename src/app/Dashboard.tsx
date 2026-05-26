import { useAuthStore } from '@/src/store/useAuthStore';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold">Workspace</h1>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/5 h-[60vh] flex items-center justify-center">
            <p className="text-gray-500">AI Chat Interface (Coming soon)</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h3 className="font-medium mb-2">Credits Remaining</h3>
              <div className="text-4xl font-bold text-indigo-400">10</div>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 flex-1">
              <h3 className="font-medium mb-4">Recent Plans</h3>
              <div className="text-sm text-gray-500">No plans generated yet.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
