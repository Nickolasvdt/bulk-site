import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Quantidade de posts por página no índice do blog. */
export const POSTS_PER_PAGE = 9;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  cover?: string;
  readingMinutes: number;
};

function readMeta(slug: string): PostMeta {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "2026-01-01",
    category: data.category ?? "Geral",
    cover: data.cover,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readMeta(f.replace(/\.mdx$/, "")))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getTotalPages(): number {
  return Math.max(1, Math.ceil(getAllPosts().length / POSTS_PER_PAGE));
}

export function getPostsPage(page: number): {
  posts: PostMeta[];
  currentPage: number;
  totalPages: number;
} {
  const all = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  return { posts: all.slice(start, start + POSTS_PER_PAGE), currentPage, totalPages };
}

export function getPost(slug: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { content } = matter(raw);
  return { meta: readMeta(slug), content };
}
