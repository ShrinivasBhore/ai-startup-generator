import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-black/60 backdrop-blur-md border-white/10 py-3'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-indigo-500" />
          <span className="text-xl font-bold font-sans text-white tracking-tight">AI Startup Gen</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign In</button>
          <button className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            Start Free Trial
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 backdrop-blur-xl p-6 flex flex-col gap-4"
        >
          <a href="#features" className="text-gray-300 font-medium">Features</a>
          <a href="#pricing" className="text-gray-300 font-medium">Pricing</a>
          <a href="#faq" className="text-gray-300 font-medium">FAQ</a>
          <hr className="border-white/10 my-2" />
          <div className="flex flex-col gap-3">
            <button className="text-center py-2 text-gray-300 font-medium">Sign In</button>
            <button className="text-center py-2 bg-indigo-600 text-white rounded-xl font-medium">Start Free Trial</button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
