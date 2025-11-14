import Link from "next/link";
import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { MostViewed } from "@/components/MostViewed";
import { getApiConfig, fetchPosts } from "@/lib/api";
import type { PostEntity } from "@/types/posts";
import {
  fallbackHeroStory,
  fallbackStoryCards,
  type StoryCard,
} from "@/data/fallbacks";
import {
  mapPostsToMostViewedItems,
  fallbackMostViewedItems,
} from "@/lib/mostViewed";
import { getPostSlug } from "@/lib/posts";

const topics = [
  { label: "All", active: true },
  { label: "Diversity & Inclusion", active: true },
  { label: "Tech companies" },
  { label: "Tech companies", active: true },
  { label: "Crypto" },
  { label: "Security" },
  { label: "Global" },
  { label: "Leaks" },
];

type StoryCardWithSlug = StoryCard & { slug?: string };

const formatReadTime = (value?: number, fallback = "— mins") =>
  typeof value === "number" && Number.isFinite(value)
    ? `${value} mins`
    : fallback;

const FileIcon = ({ className = "w-5 h-5" }: { className?: string } = {}) => (
  <Image
    src="/misc/file-icon.svg"
    alt="file icon"
    width={20}
    height={20}
    className={className}
  />
);

const ReadAction = ({
  slug,
  className,
  children,
}: {
  slug?: string;
  className: string;
  children: ReactNode;
}) =>
  slug ? (
    <Link href={`/blog/${slug}`} className={className}>
      {children}
    </Link>
  ) : (
    <span className={`${className} cursor-not-allowed opacity-60`}>
      {children}
    </span>
  );

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
  const heroStory = heroPost
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
            : (fallbackStoryCards[index % fallbackStoryCards.length]
                ?.background ?? fallbackHeroStory.background);
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
          };
        })
      : fallbackStoryCards;

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

  const renderStoryCard = (
    story: StoryCardWithSlug,
    variant: "feature" | "compact",
  ) => {
    const isCompact = variant === "compact";
    const alignmentClass =
      story.contentAlignment === "start"
        ? "items-start"
        : story.contentAlignment === "center"
          ? "items-center"
          : "items-end pb-6";

    const spanClass = !isCompact && !story.layout ? "md:row-span-2" : "";

    return (
      <article
        key={story.id}
        className={`relative flex h-full overflow-hidden border border-white/10 pl-6 ${alignmentClass} ${story.layout ?? ""} ${spanClass}`}
        style={{ background: story.background }}
      >
        <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[repeating-linear-gradient(45deg,_rgba(255,255,255,0.05)_0,_rgba(255,255,255,0.05)_2px,_transparent_2px,_transparent_8px)]" />
        <div className="relative mx-auto w-full max-w-[460px] pl-6 pr-6 text-black sm:pl-0 lg:max-w-[520px]">
          <div
            className={`inline-flex ${
              story.labelHeightClass ?? "h-12"
            } items-end justify-center bg-white px-6`}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-background-yellow px-3 py-[0.3rem] text-xs font-semibold text-black">
              {story.category}
            </div>
          </div>
          <div
            className={`flex flex-col gap-2 bg-white px-6 ${
              isCompact ? "py-3" : "py-5"
            }`}
          >
            <div className="space-y-3">
              <h3
                className={`story-title-clamp ${
                  isCompact
                    ? "text-base font-bold leading-normal"
                    : "text-lg font-semibold leading-tight"
                }`}
              >
                {story.title}
              </h3>
              {story.excerpt ? (
                <p className="text-sm text-extra-muted">{story.excerpt}</p>
              ) : null}
            </div>
            <div
              className={`mt-1 flex items-center justify-between ${
                isCompact ? "text-sm font-semibold" : "text-md font-semibold"
              }`}
            >
              <ReadAction
                slug={story.slug}
                className={`group flex items-center gap-1 transition hover:text-background-yellow ${
                  isCompact ? "text-sm" : "text-base"
                }`}
              >
                Read
                <ArrowIcon
                  className="h-6 w-6 transition group-hover:translate-x-1"
                  color="purple"
                />
              </ReadAction>
              <div className="flex items-center gap-2 text-sm font-normal text-extra-muted">
                <FileIcon className="h-4 w-4" />
                {story.readTime}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-5">
        <p className="text-md font-semibold text-white">Today story</p>
        <article
          className="relative flex h-80 items-center overflow-hidden border border-white/10"
          style={{ background: heroStory.background }}
        >
          <div className="relative ml-7">
            <div className="inline-flex h-12 items-end justify-center bg-black px-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-background-yellow px-3 py-[0.3rem] text-xs font-semibold text-black">
                {heroStory.category}
              </div>
            </div>

            <div className="flex w-123 flex-col bg-black px-6 py-6">
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                {heroStory.title}
              </h1>
              <div className="mt-3 flex justify-between">
                <ReadAction
                  slug={heroSlug}
                  className="flex items-center gap-1 rounded-full text-sm font-semibold hover:bg-white/5"
                >
                  Read
                  <ArrowIcon className="h-6 w-6" color="purple" />
                </ReadAction>
                <div className="flex items-center gap-2 pr-6 text-sm font-normal text-extra-muted">
                  <FileIcon className="h-4 w-4" />
                  {heroStory.readTime}
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-5 space-y-6">
        <div className="flex items-center">
          <p className="mr-5 font-bold">Topics</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <button
                key={index}
                className={`flex items-end gap-2 rounded-full border px-3 py-2 text-sm font-normal transition ${
                  topic.active
                    ? "border-transparent bg-background-yellow text-black"
                    : "border-white/15 bg-black/30 text-muted hover:text-white"
                }`}
              >
                {topic.label}
                {topic.active && (
                  <span
                    className={`text-[13px] ${
                      topic.active ? "text-black/70" : "text-muted"
                    }`}
                  >
                    ✕
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_270px]">
          <div className="mb-40 flex flex-col gap-12">
            {storyGroups.map((group, groupIndex) => {
              if (group.length === 0) return null;

              const featureIndex = group.findIndex((story) =>
                story.layout?.includes("row-span-2"),
              );
              const resolvedFeatureIndex =
                featureIndex === -1 ? 0 : featureIndex;
              const featureCard = group[resolvedFeatureIndex];
              const compactCards = group.filter(
                (_story, idx) => idx !== resolvedFeatureIndex,
              );
              if (!featureCard) {
                return null;
              }

              const isFeatureFirst = groupIndex % 2 === 0;
              const orderedCards = isFeatureFirst
                ? [featureCard, ...compactCards]
                : [
                    ...(compactCards[0] ? [compactCards[0]] : []),
                    featureCard,
                    ...compactCards.slice(compactCards[0] ? 1 : 0),
                  ];
              const gridColsClass = isFeatureFirst
                ? "lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1.05fr)]"
                : "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)]";

              return (
                <Fragment key={`story-group-${groupIndex}`}>
                  <div
                    className={`grid grid-cols-1 gap-7 md:auto-rows-[minmax(340px,_1fr)] md:grid-cols-2 ${gridColsClass}`}
                  >
                    {orderedCards
                      .filter((card): card is StoryCardWithSlug =>
                        Boolean(card),
                      )
                      .map((story) =>
                        renderStoryCard(
                          story,
                          story.id === featureCard?.id ? "feature" : "compact",
                        ),
                      )}
                  </div>
                  {groupIndex === 0 && (
                    <div className="border border-white/10 bg-purple px-4 py-8 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 md:px-10 md:py-9">
                      <p className="text-lg font-normal leading-relaxed sm:max-w-3xl sm:text-[1.45rem]">
                        Sign up for our newsletter{" "}
                        <span className="font-semibold">
                          and get daily updates
                        </span>
                      </p>
                      <button className="mt-6 inline-flex items-center justify-center bg-background-yellow px-7.5 py-3 text-sm font-medium text-black transition hover:bg-background-yellow/80 sm:mt-0">
                        Subscribe
                      </button>
                    </div>
                  )}
                </Fragment>
              );
            })}
            <button className="mx-auto mt-2 inline-flex cursor-pointer items-center justify-center bg-background-yellow px-7 py-[0.8rem] text-md font-medium text-black transition hover:bg-background-yellow/40 hover:text-white">
              Load more
            </button>
          </div>

          <MostViewed heading={mostViewedHeading} items={mostViewedItems} />
        </div>
      </section>
    </div>
  );
}
