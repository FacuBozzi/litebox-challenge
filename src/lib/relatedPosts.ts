import type { RelatedPost } from "@/types/relatedPosts";

const RELATED_POSTS_ENDPOINT = "/api/posts/related";
const NO_CACHE_OPTIONS = { cache: "no-store" } as const;

export const fetchRelatedPostsPayload = async (
  host: string,
): Promise<RelatedPost[]> => {
  const response = await fetch(`${host}${RELATED_POSTS_ENDPOINT}`, {
    method: "GET",
    ...NO_CACHE_OPTIONS,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch related posts (${response.status})`);
  }

  const payload = (await response.json()) as unknown;
  if (!Array.isArray(payload)) {
    console.warn("Related posts payload is not an array. Returning empty list.");
    return [];
  }
  return payload as RelatedPost[];
};

export const fetchRelatedPosts = async (
  host: string,
): Promise<RelatedPost[]> => fetchRelatedPostsPayload(host);
