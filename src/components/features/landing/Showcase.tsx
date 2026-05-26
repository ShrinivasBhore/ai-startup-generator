import { motion } from "motion/react";
import {
  Terminal,
  Lightbulb,
  FileText,
  BarChart3,
  Presentation,
  CheckCircle2,
} from "lucide-react";

const generationSteps = [
  {
    icon: <Lightbulb className="w-4 h-4" />,
    text: "Analyzing market viability...",
    delay: 0,
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    text: "Generating 3-year financial model...",
    delay: 1.5,
  },
  {
    icon: <Presentation className="w-4 h-4" />,
    text: "Structuring investor pitch deck...",
    delay: 3,
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    text: "Startup business plan complete.",
    delay: 4.5,
  },
];

export function Showcase() {
  return (
    <section className="relative pb-24 px-6 mt-[-100px] z-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative rounded-2xl md:rounded-[2rem] border border-white/10 bg-black/50 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(79,70,229,0.15)] ring-1 ring-white/10"
        >
          {/* Header Bar */}
          <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/[0.02]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="mx-auto flex items-center gap-2 px-3 py-1 bg-white/5 rounded-md text-xs text-gray-400 font-mono">
              <Terminal className="w-3 h-3" />
              generator.app
            </div>
          </div>

          {/* Interface Body */}
          <div className="flex flex-col md:flex-row h-[500px]">
            {/* Sidebar Input Mock */}
            <div className="w-full md:w-1/3 bg-white/[0.01] border-r border-white/10 p-6 flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-medium text-white mb-2">
                  Startup Concept
                </h3>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 leading-relaxed shadow-inner">
                  "I want to build a B2B SaaS platform that uses AI to optimize
                  warehouse logistics and supply chain routing for mid-sized
                  ecommerce brands."
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                {generationSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 + step.delay, duration: 0.5 }}
                    className="flex items-center gap-3 text-xs text-gray-400 font-mono bg-white/5 p-3 rounded-lg border border-white/5"
                  >
                    {step.icon}
                    {step.text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Output Mock */}
            <div className="flex-1 p-6 md:p-10 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-black to-black">
              {/* Animated Document Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="h-full flex flex-col gap-6"
              >
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      LogisAI Business Plan
                    </h2>
                    <p className="text-sm text-gray-400">Generated in 1.4s</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 3.5, duration: 0.5 }}
                    className="p-5 rounded-xl border border-white/10 bg-white/5 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2 text-indigo-400 mb-1">
                      <Presentation className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Executive Summary
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full" />
                    <div className="w-5/6 h-2 bg-white/10 rounded-full" />
                    <div className="w-full h-2 bg-white/10 rounded-full" />
                    <div className="w-4/6 h-2 bg-white/10 rounded-full" />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 4, duration: 0.5 }}
                    className="p-5 rounded-xl border border-white/10 bg-white/5 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 mb-1">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Financials
                      </span>
                    </div>
                    <div className="flex items-end gap-2 h-12 pt-2">
                      <div className="w-1/4 h-1/3 bg-emerald-500/20 rounded-t-sm" />
                      <div className="w-1/4 h-2/3 bg-emerald-500/40 rounded-t-sm" />
                      <div className="w-1/4 h-full bg-emerald-500/60 rounded-t-sm" />
                      <div className="w-1/4 h-[120%] bg-emerald-500/80 rounded-t-sm relative -top-2" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 4.5, duration: 0.5 }}
                    className="col-span-2 p-5 rounded-xl border border-white/10 bg-white/5 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2 text-amber-400 mb-1">
                      <Lightbulb className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Go-to-Market Strategy
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-10 bg-white/5 rounded-lg border border-white/5" />
                      <div className="h-10 bg-white/5 rounded-lg border border-white/5" />
                      <div className="h-10 bg-white/5 rounded-lg border border-white/5" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
