import type { StoryCard } from "@/data/fallbacks";

export type HeroStory = {
  category: string;
  title: string;
  summary?: string;
  readTime: string;
  background: string;
};

export type StoryCardWithSlug = StoryCard & { slug?: string };
