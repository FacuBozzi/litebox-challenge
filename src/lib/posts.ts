import type { PostEntity } from "@/types/posts";

export const getPostSlug = (post: PostEntity): string => {
  const candidate = post.attributes?.slug?.trim();
  if (candidate) {
    return candidate;
  }

  return String(post.id);
};

export const matchesPostSlug = (
  post: PostEntity,
  slug?: string | null,
): boolean => {
  if (!slug) {
    return false;
  }
  const normalized = slug.trim().toLowerCase();
  const attrSlug = post.attributes?.slug?.trim().toLowerCase();

  if (attrSlug && attrSlug === normalized) {
    return true;
  }

  return String(post.id) === normalized;
};
