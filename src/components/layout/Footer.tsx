import { BrainCircuit } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-indigo-500" />
          <span className="text-lg font-bold font-sans text-white tracking-tight">
            AI Startup Gen
          </span>
        </div>

        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AI Startup Gen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
