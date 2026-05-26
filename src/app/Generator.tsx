import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DashboardLayout } from '@/src/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BrainCircuit, Lightbulb, Target, Wallet, Briefcase, Zap, ListChecks, Crosshair, BarChart3, Code2, Rocket, ArrowLeft, Download } from 'lucide-react';
import { useAuthStore } from '@/src/store/useAuthStore';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const formSchema = z.object({
  idea: z.string().min(10, 'Please provide more details about your idea (at least 10 characters).'),
  industry: z.string().min(1, 'Please select an industry.'),
  budget: z.string().min(1, 'Please select a budget range.'),
  audience: z.string().min(1, 'Please select a target audience.'),
});

type FormData = z.infer<typeof formSchema>;

export default function Generator() {
  const token = useAuthStore((state) => state.token);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: '',
      budget: '',
      audience: '',
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/generate/startup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      
      if (!res.ok) {
        throw new Error(json.error || 'Failed to generate startup plan');
      }

      setResult(json.plan);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportPDF = () => {
    if (!result) return;
    
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;

    const addLine = (text: string, isHeader = false) => {
      if (y > 270) {
        doc.addPage();
        y = margin;
      }
      if (isHeader) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
      }
      
      const lines = doc.splitTextToSize(text, 170);
      doc.text(lines, margin, y);
      y += (lines.length * 5) + (isHeader ? 4 : 2);
    };

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(result.name, margin, y);
    y += 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text(result.tagline, margin, y);
    y += 12;

    addLine('Business Summary', true);
    addLine(result.businessSummary);
    y += 4;

    addLine('Core Features', true);
    result.features.forEach((feature: string) => addLine(`• ${feature}`));
    y += 4;

    addLine('Marketing Strategy', true);
    addLine(result.marketingStrategy);
    y += 4;

    addLine('SWOT Analysis', true);
    addLine('Strengths:');
    result.swot.strengths.forEach((s: string) => addLine(`  - ${s}`));
    addLine('Weaknesses:');
    result.swot.weaknesses.forEach((s: string) => addLine(`  - ${s}`));
    addLine('Opportunities:');
    result.swot.opportunities.forEach((s: string) => addLine(`  - ${s}`));
    addLine('Threats:');
    result.swot.threats.forEach((s: string) => addLine(`  - ${s}`));
    y += 4;

    addLine('MVP Roadmap', true);
    result.mvpRoadmap.forEach((phase: any) => {
      addLine(phase.phase);
      phase.tasks.forEach((task: string) => addLine(`  - ${task}`));
    });
    y += 4;

    addLine('Tech Stack', true);
    result.techStack.forEach((tech: any) => {
      addLine(`${tech.name}: ${tech.reason}`);
    });

    doc.save(`${result.name.replace(/\s+/g, '_')}_Business_Plan.pdf`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        
        <header className="flex items-center justify-between">
          <div>
            <Link to="/dashboard" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-indigo-400" />
              AI Studio Workspace
            </h1>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!result && !isGenerating && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-black border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-lg font-medium text-white">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    Describe your startup idea
                  </label>
                  <p className="text-sm text-gray-400">Be as specific as possible about the problem you are solving and your proposed solution.</p>
                  <textarea 
                    {...register('idea')}
                    rows={4}
                    placeholder="E.g., An AI-powered platform for local bakeries to predict demand and reduce food waste..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                  {errors.idea && <p className="text-sm text-red-500 mt-1">{errors.idea.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Industry Input */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                      <Briefcase className="w-4 h-4 text-emerald-400" /> Industry
                    </label>
                    <select 
                      {...register('industry')}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    >
                      <option value="" disabled className="bg-zinc-900">Select Industry</option>
                      <option value="SaaS / Software" className="bg-zinc-900">SaaS / Software</option>
                      <option value="Fintech" className="bg-zinc-900">Fintech</option>
                      <option value="Healthtech / Medtech" className="bg-zinc-900">Healthtech / Medtech</option>
                      <option value="E-commerce" className="bg-zinc-900">E-commerce</option>
                      <option value="Edtech" className="bg-zinc-900">Edtech</option>
                      <option value="Cleantech / Green Energy" className="bg-zinc-900">Cleantech / Green Energy</option>
                      <option value="Logistics / Supply Chain" className="bg-zinc-900">Logistics / Supply Chain</option>
                    </select>
                    {errors.industry && <p className="text-sm text-red-500 mt-1">{errors.industry.message}</p>}
                  </div>

                  {/* Budget Input */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                      <Wallet className="w-4 h-4 text-rose-400" /> Initial Budget
                    </label>
                    <select 
                      {...register('budget')}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    >
                      <option value="" disabled className="bg-zinc-900">Select Budget</option>
                      <option value="Bootstrapped (<$10k)" className="bg-zinc-900">Bootstrapped (&lt;$10k)</option>
                      <option value="Pre-seed ($10k - $100k)" className="bg-zinc-900">Pre-seed ($10k - $100k)</option>
                      <option value="Seed ($100k - $1M)" className="bg-zinc-900">Seed ($100k - $1M)</option>
                      <option value="Series A ready (>$1M)" className="bg-zinc-900">Series A ready (&gt;$1M)</option>
                    </select>
                    {errors.budget && <p className="text-sm text-red-500 mt-1">{errors.budget.message}</p>}
                  </div>

                  {/* Audience Input */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                      <Target className="w-4 h-4 text-blue-400" /> Target Audience
                    </label>
                    <select 
                      {...register('audience')}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    >
                      <option value="" disabled className="bg-zinc-900">Select Audience</option>
                      <option value="B2B Enterprise" className="bg-zinc-900">B2B Enterprise</option>
                      <option value="B2B SMBs" className="bg-zinc-900">B2B SMBs</option>
                      <option value="B2C Consumers" className="bg-zinc-900">B2C Consumers</option>
                      <option value="B2B2C" className="bg-zinc-900">B2B2C</option>
                      <option value="D2C Niche Community" className="bg-zinc-900">D2C Niche Community</option>
                    </select>
                    {errors.audience && <p className="text-sm text-red-500 mt-1">{errors.audience.message}</p>}
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                    {error}
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button 
                    type="submit" 
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95"
                  >
                    <BrainCircuit className="w-5 h-5" />
                    Generate Startup Intelligence
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {isGenerating && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                <motion.div 
                  className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <BrainCircuit className="absolute inset-0 m-auto w-8 h-8 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Analyzing Data Streams...</h2>
              <p className="text-indigo-200">Building your custom startup business plan.</p>
              
              <div className="mt-8 flex flex-col gap-3 w-full max-w-sm">
                <LoadingStep text="Evaluating market dynamics..." delay={0} />
                <LoadingStep text="Drafting go-to-market strategy..." delay={1} />
                <LoadingStep text="Architecting tech stack..." delay={2} />
              </div>
            </motion.div>
          )}

          {result && !isGenerating && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header Card */}
              <div className="bg-gradient-to-r from-indigo-900/40 to-black border border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">{result.name}</h2>
                  <p className="text-xl text-indigo-300 font-medium mb-6">"{result.tagline}"</p>
                  <p className="text-gray-300 leading-relaxed max-w-3xl text-lg">{result.businessSummary}</p>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                  <Rocket className="w-48 h-48 text-indigo-500" />
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Features */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                    <ListChecks className="w-5 h-5 text-emerald-400" /> Core Features
                  </h3>
                  <ul className="space-y-3">
                    {result.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strategy */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                    <Crosshair className="w-5 h-5 text-rose-400" /> Marketing Strategy
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {result.marketingStrategy}
                  </p>
                </div>

                {/* SWOT Box */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:col-span-2">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-6">
                    <BarChart3 className="w-5 h-5 text-amber-400" /> SWOT Analysis
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                      <h4 className="text-emerald-400 font-semibold mb-2">Strengths</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-emerald-100/70">
                        {result.swot.strengths.map((i: string, idx: number) => <li key={idx}>{i}</li>)}
                      </ul>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                      <h4 className="text-red-400 font-semibold mb-2">Weaknesses</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-red-100/70">
                        {result.swot.weaknesses.map((i: string, idx: number) => <li key={idx}>{i}</li>)}
                      </ul>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                      <h4 className="text-blue-400 font-semibold mb-2">Opportunities</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-blue-100/70">
                        {result.swot.opportunities.map((i: string, idx: number) => <li key={idx}>{i}</li>)}
                      </ul>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                      <h4 className="text-amber-400 font-semibold mb-2">Threats</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-amber-100/70">
                        {result.swot.threats.map((i: string, idx: number) => <li key={idx}>{i}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* MVP Roadmap */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                    <Zap className="w-5 h-5 text-violet-400" /> MVP Roadmap
                  </h3>
                  <div className="space-y-4 relative border-l border-white/10 ml-2 pl-4">
                    {result.mvpRoadmap.map((step: any, idx: number) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-violet-400 ring-4 ring-black" />
                        <h4 className="text-white text-sm font-medium mb-1">{step.phase}</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                          {step.tasks.map((task: string, i: number) => <li key={i}>- {task}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                    <Code2 className="w-5 h-5 text-indigo-400" /> Recommended Tech Stack
                  </h3>
                  <div className="space-y-3">
                    {result.techStack.map((tech: any, idx: number) => (
                      <div key={idx} className="bg-black/50 border border-white/5 p-3 rounded-lg flex items-start gap-3">
                        <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                           <Code2 className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-medium">{tech.name}</h4>
                          <p className="text-xs text-gray-400 mt-1">{tech.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={exportPDF}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                >
                  <Download className="w-5 h-5" />
                  Download PDF Report
                </button>
                <button 
                  onClick={() => setResult(null)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors"
                >
                  Generate Another Plan
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}

function LoadingStep({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 1.5 + 0.5, duration: 0.5 }}
      className="flex items-center gap-3 bg-white/5 border border-white/5 px-4 py-3 rounded-xl text-sm text-gray-300"
    >
      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
      {text}
    </motion.div>
  );
}
