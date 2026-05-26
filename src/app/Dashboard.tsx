import { useAuthStore } from '@/src/store/useAuthStore';
import { DashboardLayout } from '@/src/components/layout/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Sparkles, TrendingUp, Presentation, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

const data = [
  { name: 'Jan', plans: 2 },
  { name: 'Feb', plans: 3 },
  { name: 'Mar', plans: 5 },
  { name: 'Apr', plans: 4 },
  { name: 'May', plans: 8 },
  { name: 'Jun', plans: 12 },
];

const recentProjects = [
  { id: 1, name: 'EcoLogistics AI', status: 'Completed', date: '2 hours ago', type: 'SaaS' },
  { id: 2, name: 'FinSync Pro', status: 'Completed', date: 'Yesterday', type: 'Fintech' },
  { id: 3, name: 'HealthConnect', status: 'Generating', date: 'Just now', type: 'HealthTech' },
];

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-indigo-900/30 to-violet-900/10 p-6 sm:p-8 rounded-3xl border border-white/10 ring-1 ring-inset ring-white/5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Founder'}!
            </h2>
            <p className="text-indigo-200">Ready to build your next big idea?</p>
          </div>
          <a href="/generator" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95 whitespace-nowrap">
            <Plus className="w-5 h-5" />
            New Startup Plan
          </a>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">+12%</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">24</div>
            <div className="text-sm text-gray-400">Total Plans Generated</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">$4.2M</div>
            <div className="text-sm text-gray-400">Funding Raised (Est)</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl">
                <Presentation className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">10</div>
            <div className="text-sm text-gray-400">Credits Remaining</div>
          </motion.div>
        </div>

        {/* Main Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Generation Activity</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPlans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#c7d2fe' }}
                  />
                  <Area type="monotone" dataKey="plans" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPlans)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Projects List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Projects</h3>
              <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
            </div>

            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white mb-1 group-hover:text-indigo-300 transition-colors">{project.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{project.type}</span>
                      <span>&bull;</span>
                      <span>{project.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      project.status === 'Completed' 
                        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                        : 'border-amber-500/30 text-amber-400 bg-amber-500/10 animate-pulse'
                    }`}>
                      {project.status === 'Generating' ? 'Generating...' : 'Ready'}
                    </span>
                    <button className="text-gray-500 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </DashboardLayout>
  );
}
