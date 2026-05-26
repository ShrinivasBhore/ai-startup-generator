import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for solo entrepreneurs validating a single idea.",
    features: [
      "1 Business Plan",
      "Basic Market Research",
      "PDF Export",
      "Email Support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$79",
    description: "For serious founders needing comprehensive materials.",
    features: [
      "5 Business Plans",
      "Deep Competitor Analysis",
      "Financial Models",
      "Pitch Deck Generator",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Agency",
    price: "$199",
    description: "For incubators, VC firms, and agency builders.",
    features: [
      "Unlimited Plans",
      "API Access",
      "Custom Branding",
      "Collaborative Workspace",
      "Dedicated Account Manager",
    ],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 bg-black relative z-10 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Simple, transparent pricing.
          </h2>
          <p className="text-gray-400 text-lg">
            Invest in clarity. Choose the plan that fits your startup journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "relative p-8 rounded-3xl border flex flex-col h-full bg-black",
                plan.popular
                  ? "border-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.15)]"
                  : "border-white/10",
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm h-10">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">/mo</span>
                </div>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={cn(
                  "w-full mt-8 py-3 rounded-xl font-medium transition-colors",
                  plan.popular
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10",
                )}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
