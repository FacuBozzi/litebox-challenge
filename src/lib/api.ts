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

export const fetchPosts = async (
  host: string,
  limit = 14,
): Promise<PostEntity[]> => {
  const response = await fetch(`${host}/api/posts?limit=${limit}`, {
    ...getFetchCacheOptions(),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const posts: PostsResponse = await response.json();
  return posts.data ?? [];
};
