// lib/types.ts

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  description?: string;
  headerImage?: string;
  content?: string;
  tags?: string[];
  author?: {
    name: string;
  } | null;
}
