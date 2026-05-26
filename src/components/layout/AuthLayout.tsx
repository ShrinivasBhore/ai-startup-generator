import { BrainCircuit } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen bg-black flex text-white overflow-hidden relative">
      {/* Visual left section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-950 flex-col justify-between p-12 border-r border-white/10">
        <div className="relative z-10 flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-indigo-500" />
          <span className="text-xl font-bold font-sans tracking-tight">
            AI Startup Gen
          </span>
        </div>

        <div className="relative z-10 max-w-lg mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 tracking-tight"
          >
            Turn big ideas into execution plans.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Join thousands of founders leveraging enterprise-grade AI to
            generate business strategy, financial models, and precise market
            research.
          </motion.p>
        </div>

        {/* abstract ambient background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px] pointer-events-none" />
      </div>

      {/* Right section - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24">
        <div className="flex items-center gap-2 lg:hidden mb-12">
          <BrainCircuit className="w-8 h-8 text-indigo-500" />
          <span className="text-xl font-bold font-sans tracking-tight">
            AI Startup Gen
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-gray-400 text-sm">{subtitle}</p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
