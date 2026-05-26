import { motion } from 'motion/react';
import { Target, TrendingUp, Presentation, Lightbulb, Wallet, Shield } from 'lucide-react';

const features = [
  {
    icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
    title: "Idea Validation",
    description: "AI analyzes market trends to evaluate the viability and novelty of your startup concept."
  },
  {
    icon: <Target className="w-6 h-6 text-emerald-500" />,
    title: "Market Analysis",
    description: "Deep dive into your target audience, competitor landscape, and entry strategy."
  },
  {
    icon: <Presentation className="w-6 h-6 text-indigo-500" />,
    title: "Pitch Deck Generation",
    description: "Automatically structured investor-ready slide-by-slide pitch presentations."
  },
  {
    icon: <Wallet className="w-6 h-6 text-rose-500" />,
    title: "Financial Projections",
    description: "3-year rolling financial models with burn rate, ARR, and funding requirement estimates."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
    title: "Go-to-Market Strategy",
    description: "Actionable marketing channels and launch strategies tailored to your niche."
  },
  {
    icon: <Shield className="w-6 h-6 text-violet-500" />,
    title: "Risk Assessment",
    description: "Identification of potential failure points and mitigation strategies for investors."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-black relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Everything you need to launch.
          </h2>
          <p className="text-gray-400 text-lg">
            Our platform provides a complete suite of tools to transform your shower thoughts into actionable, structured roadmaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-black border border-white/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
