import type { MostViewedItem } from "@/components/MostViewed";
import {
  fallbackMostViewedPosts,
  fallbackMostViewedAccents,
} from "@/data/fallbacks";
import type { PostEntity } from "@/types/posts";
import { getPostSlug } from "@/lib/posts";

export const mapPostsToMostViewedItems = (
  posts: PostEntity[],
  baseUrl: string,
): MostViewedItem[] =>
  posts.map((post, index) => {
    const attrs = post.attributes ?? {};
    const coverUrl = attrs.coverImg?.data?.attributes?.url;
    const background = coverUrl
      ? `url(${baseUrl}${coverUrl}) center center / cover no-repeat`
      : fallbackMostViewedAccents[index % fallbackMostViewedAccents.length];

    return {
      id: String(post.id),
      title: attrs.title ?? "Untitled Post",
      background,
      slug: getPostSlug(post),
    };
  });

export const fallbackMostViewedItems: MostViewedItem[] =
  fallbackMostViewedPosts.map((post, index) => ({
    id: `fallback-${index}`,
    title: post.title,
    background: post.accent,
  }));
