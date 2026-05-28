"use client";

import Image from "next/image";
import { motion } from "motion/react";

const faces = [
  { src: "https://plus.unsplash.com/premium_photo-1682088367648-735b1a6ac612?auto=format&fit=crop&w=80&q=80", alt: "Cliente Bulk" },
  { src: "https://images.unsplash.com/photo-1573496527892-904f897eb744?auto=format&fit=crop&w=80&q=80", alt: "Cliente Bulk" },
  { src: "https://images.unsplash.com/photo-1778550579010-cb0d00cd94e6?auto=format&fit=crop&w=80&q=80", alt: "Cliente Bulk" },
  { src: "https://images.unsplash.com/photo-1758519291037-db9ec86cda69?auto=format&fit=crop&w=80&q=80", alt: "Cliente Bulk" },
  { src: "https://plus.unsplash.com/premium_photo-1661902210733-17533340166f?auto=format&fit=crop&w=80&q=80", alt: "Cliente Bulk" },
];

export function SocialProofBand() {
  return (
    <section className="py-7 border-b border-ink/[0.07] bg-ink/[0.02]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center gap-5"
        >
          {/* Overlapping avatars */}
          <div className="flex -space-x-2 shrink-0">
            {faces.map((face, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-bg overflow-hidden relative shrink-0"
                style={{ zIndex: faces.length - i }}
              >
                <Image src={face.src} alt={face.alt} fill className="object-cover" sizes="36px" />
              </div>
            ))}
          </div>

          {/* Copy */}
          <div>
            <p className="text-[14px] font-medium text-ink leading-snug">
              +200 negócios locais em São Paulo
            </p>
            <p className="text-[11px] text-mute mt-0.5">
              já transformaram sua presença digital com a Bulk
            </p>
          </div>

          {/* Badge */}
          <div className="sm:ml-auto shrink-0">
            <span className="inline-flex items-center gap-1.5 border border-accent/30 text-accent rounded-full px-3.5 py-1.5 text-[10px] font-mono tracking-[0.14em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
              Vagas abertas
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
