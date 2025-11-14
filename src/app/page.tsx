import { HeroSection } from "@/components/home/HeroSection";
import { TopicsSection } from "@/components/home/TopicsSection";
import { StoriesSection } from "@/components/home/StoriesSection";
import type { StoryCardWithSlug, HeroStory } from "@/components/home/types";
import { getApiConfig, fetchPosts } from "@/lib/api";
import type { PostEntity } from "@/types/posts";
import { fallbackHeroStory, fallbackStoryCards } from "@/data/fallbacks";
import {
  mapPostsToMostViewedItems,
  fallbackMostViewedItems,
} from "@/lib/mostViewed";
import { getPostSlug } from "@/lib/posts";
import { topicFilters } from "@/data/topics";

const formatReadTime = (value?: number, fallback = "— mins") =>
  typeof value === "number" && Number.isFinite(value)
    ? `${value} mins`
    : fallback;

export default async function Home() {
  const { baseUrl: normalizedBaseUrl, host: normalizedHost } = getApiConfig();

  let postsData: PostEntity[] = [];

  try {
    postsData = await fetchPosts(normalizedHost, 14);
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }

  const heroPost = postsData[0];
  const heroSlug = heroPost ? getPostSlug(heroPost) : undefined;
  const heroAttributes = heroPost?.attributes ?? {};
  const heroCoverUrl = heroAttributes.coverImg?.data?.attributes?.url;
  const heroStory: HeroStory = heroPost
    ? {
        category: heroAttributes.topic ?? fallbackHeroStory.category,
        title: heroAttributes.title ?? fallbackHeroStory.title,
        summary: heroAttributes.subtitle ?? fallbackHeroStory.summary,
        readTime: formatReadTime(
          heroAttributes.readTime,
          fallbackHeroStory.readTime,
        ),
        background: heroCoverUrl
          ? `url(${normalizedBaseUrl}${heroCoverUrl}) center center / cover no-repeat`
          : fallbackHeroStory.background,
      }
    : fallbackHeroStory;

  const storyPosts = postsData.slice(1, 10);
  const storyCards: StoryCardWithSlug[] =
    storyPosts.length > 0
      ? storyPosts.map((post, index) => {
          const attrs = post.attributes ?? {};
          const coverUrl = attrs.coverImg?.data?.attributes?.url;
          const background = coverUrl
            ? `url(${normalizedBaseUrl}${coverUrl}) center center / cover no-repeat`
            : (fallbackStoryCards[index % fallbackStoryCards.length]?.background ??
                fallbackHeroStory.background);
          const isFeature = index % 3 === 0;

          return {
            id: String(post.id),
            category: attrs.topic ?? "General",
            title: attrs.title ?? "Untitled Post",
            excerpt: attrs.subtitle ?? "",
            readTime: formatReadTime(attrs.readTime, "— mins"),
            accent: "var(--color-background-yellow)",
            background,
            slug: getPostSlug(post),
            layout: isFeature
              ? "md:row-span-2 md:min-h-[420px] lg:min-h-[520px]"
              : undefined,
            contentAlignment: isFeature ? "end" : undefined,
            labelHeightClass: isFeature ? "h-11" : "h-12",
          } satisfies StoryCardWithSlug;
        })
      : fallbackStoryCards.map(
          (card): StoryCardWithSlug => ({
            ...card,
          }),
        );

  const storyGroups: StoryCardWithSlug[][] = [];
  for (let i = 0; i < storyCards.length; i += 3) {
    storyGroups.push(storyCards.slice(i, i + 3));
  }

  const mostViewedPosts = postsData.slice(10, 14);
  const mostViewedItems =
    mostViewedPosts.length > 0
      ? mapPostsToMostViewedItems(mostViewedPosts, normalizedBaseUrl)
      : fallbackMostViewedItems;

  const mostViewedHeading =
    mostViewedPosts.length > 0 ? "Most viewed" : "Most viewed (demo)";

  return (
    <div className="flex flex-col gap-10">
      <HeroSection story={heroStory} slug={heroSlug} />
      <TopicsSection topics={topicFilters} />
      <StoriesSection
        storyGroups={storyGroups}
        mostViewedHeading={mostViewedHeading}
        mostViewedItems={mostViewedItems}
      />
    </div>
  );
}
