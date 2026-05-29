"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { PostMeta } from "@/lib/blog";

export function BlogSection({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;

  return (
    <section id="blog" className="bg-bg pt-16 md:pt-24 pb-10 md:pb-14">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="txt-eyebrow text-accent mb-3">Conteúdo</p>
            <h2 className="font-display font-bold text-[clamp(24px,3.2vw,40px)] leading-[1.05] tracking-[-0.025em] text-ink">
              Conteúdos para você{" "}
              <span className="font-display italic text-accent">crescer.</span>
            </h2>
          </div>
          <p className="text-[14px] text-mute max-w-xs">
            Estratégias práticas de presença digital para negócios locais.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-xl overflow-hidden border border-rule hover:border-accent transition-colors p-6"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/30 rounded-full px-2 py-0.5 self-start mb-3">
                  {post.category}
                </span>
                <p className="font-display font-bold text-[18px] leading-[1.3] text-ink group-hover:text-accent transition-colors mb-2">
                  {post.title}
                </p>
                <p className="text-[14px] text-mute leading-[1.6] line-clamp-3">{post.description}</p>
                <p className="text-[12px] text-mute mt-auto pt-4">{post.readingMinutes} min de leitura</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-rule rounded-md px-6 py-3 text-[14px] font-semibold text-ink hover:border-accent hover:text-accent transition-colors min-h-[44px]"
          >
            Ver todos os artigos →
          </Link>
        </div>
      </div>
    </section>
  );
}
