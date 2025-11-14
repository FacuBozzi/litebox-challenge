import type { PostEntity, PostsResponse } from "@/types/posts";

const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

export type ApiConfig = {
  baseUrl: string;
  host: string;
};

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
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const posts: PostsResponse = await response.json();
  return posts.data ?? [];
};
