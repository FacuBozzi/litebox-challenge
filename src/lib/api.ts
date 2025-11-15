import type { PostEntity, PostsResponse } from "@/types/posts";

const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

export type ApiConfig = {
  baseUrl: string;
  host: string;
};

const FALLBACK_REVALIDATE_SECONDS = 300;

const resolveRevalidateSeconds = (): number => {
  const rawValue = process.env.LITE_TECH_REVALIDATE_SECONDS;
  if (!rawValue) {
    return FALLBACK_REVALIDATE_SECONDS;
  }

  const parsedValue = Number(rawValue);
  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return FALLBACK_REVALIDATE_SECONDS;
  }

  return parsedValue;
};

const REVALIDATE_SECONDS = resolveRevalidateSeconds();

type FetchCacheOptions = {
  cache?: RequestCache;
  next?: {
    revalidate?: number;
  };
};

export const getFetchCacheOptions = (): FetchCacheOptions =>
  REVALIDATE_SECONDS === 0
    ? { cache: "no-store" }
    : { next: { revalidate: REVALIDATE_SECONDS } };

export const getApiConfig = (): ApiConfig => {
  const apiBaseUrl = process.env.LITE_TECH_API_BASE_URL;
  const apiHost = process.env.LITE_TECH_API_HOST;

  if (!apiBaseUrl) {
    throw new Error(
      "LITE_TECH_API_BASE_URL is not defined. Please set it in your environment.",
    );
  }

  if (!apiHost) {
    throw new Error(
      "LITE_TECH_API_HOST is not defined. Please set it in your environment.",
    );
  }

  return {
    baseUrl: trimTrailingSlash(apiBaseUrl),
    host: trimTrailingSlash(apiHost),
  };
};

const POSTS_ENDPOINT = "/api/posts";

const createPostsUrl = (origin: string, limit: number): string => {
  const normalizedOrigin = trimTrailingSlash(origin);
  const url = new URL(POSTS_ENDPOINT, `${normalizedOrigin}/`);
  const params = new URLSearchParams();
  params.set("pagination[start]", "0");
  params.set("pagination[limit]", String(limit));
  params.set("sort[0]", "publishedAt:desc");
  url.search = params.toString();
  return url.toString();
};

export const fetchPosts = async (
  host: string,
  limit = 14,
): Promise<PostEntity[]> => {
  const targetHost = trimTrailingSlash(host);
  const response = await fetch(createPostsUrl(targetHost, limit), {
    ...getFetchCacheOptions(),
  });

  if (!response.ok) {
    throw new Error(`Request to ${targetHost} failed with status ${response.status}`);
  }

  const posts: PostsResponse = await response.json();
  return posts.data ?? [];
};
