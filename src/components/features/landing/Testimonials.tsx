import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "This platform saved me 3 weeks of research. The pitch deck generated helped me secure my first pre-seed meeting.",
    author: "Elena Rodriguez",
    role: "Founder, EcoLogistics",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    quote:
      "The financial models are shockingly accurate. It gave us a realistic view of our burn rate before we even launched.",
    author: "David Chen",
    role: "CEO, FinSync AI",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    quote:
      "I've used it to validate 4 different ideas. It's like having an impartial co-founder who excels at research.",
    author: "Sarah Jenkins",
    role: "Serial Entrepreneur",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-black relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-tight">
          Trusted by Next-Gen Founders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-8 italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-12 h-12 rounded-full ring-2 ring-white/10"
                />
                <div>
                  <div className="font-medium text-white">{t.author}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
