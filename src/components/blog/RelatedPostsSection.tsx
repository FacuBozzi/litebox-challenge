"use client";

import { useCallback, useState, type ReactNode } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { FileIcon } from "@/components/FileIcon";
import { PostCreationModal } from "@/components/PostCreationModal";
import type { RelatedPost } from "@/types/relatedPosts";

type RelatedStoryCardData = {
  id: string;
  title: string;
  backgroundImage: string;
  meta: string;
  slug?: string;
};

type RelatedPostsSectionProps = {
  relatedPosts: RelatedPost[];
  apiHost: string;
};

const RELATED_CARD_FALLBACK_BG =
  "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(0,0,0,0.6))";

const formatRelatedPostMeta = (createdAt?: string) => {
  if (!createdAt) {
    return "— mins";
  }
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return "— mins";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const resolveRelatedBackground = (
  imageUrl: string | undefined,
  apiHost: string,
) => {
  if (!imageUrl) {
    return RELATED_CARD_FALLBACK_BG;
  }
  const isAbsolute = imageUrl.startsWith("http");
  const resolvedUrl = isAbsolute ? imageUrl : `${apiHost}${imageUrl}`;
  return `url(${resolvedUrl})`;
};

const mapRelatedPostsToCards = (
  posts: RelatedPost[],
  apiHost: string,
): RelatedStoryCardData[] =>
  posts.slice(0, 3).map((post) => ({
    id: post.id,
    title: post.title ?? "Untitled Post",
    backgroundImage: resolveRelatedBackground(post.imageUrl, apiHost),
    meta: formatRelatedPostMeta(post.createdAt),
    slug: post.id,
  }));

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
    <button className={`interactive-hover ${className}`}>{children}</button>
  ) : (
    <span
      className={`interactive-hover ${className} cursor-not-allowed opacity-60`}
      aria-disabled="true"
    >
      {children}
    </span>
  );

const RelatedStoryCard = ({ card }: { card: RelatedStoryCardData }) => (
  <article
    className="relative flex h-full min-h-[320px] items-end overflow-hidden border border-white/10 pl-6 pb-6"
    style={{
      backgroundImage: card.backgroundImage,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[repeating-linear-gradient(45deg,_rgba(255,255,255,0.05)_0,_rgba(255,255,255,0.05)_2px,_transparent_2px,_transparent_8px)]" />
    <div className="relative mx-auto w-full max-w-[460px] pl-6 pr-6 text-black sm:pl-0 lg:max-w-[520px]">
      <div className="inline-flex h-12 items-end justify-center bg-white px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-background-yellow px-3 py-[0.3rem] text-xs font-semibold text-black">
          Related
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-white px-6 py-3">
        <div className="space-y-3">
          <h3 className="story-title-clamp text-base font-bold leading-normal">
            {card.title}
          </h3>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm font-semibold">
          <ReadAction
            slug={card.slug}
            className="group flex items-center gap-1 transition hover:text-background-yellow"
          >
            Read
            <ArrowIcon
              className="h-6 w-6 transition group-hover:translate-x-1"
              color="purple"
            />
          </ReadAction>
          <div className="flex items-center gap-2 text-sm font-normal text-extra-muted">
            <FileIcon className="h-4 w-4" />
            {card.meta}
          </div>
        </div>
      </div>
    </div>
  </article>
);

export const RelatedPostsSection = ({
  relatedPosts,
  apiHost,
}: RelatedPostsSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const relatedCards = mapRelatedPostsToCards(relatedPosts, apiHost);
  const hasRelatedPosts = relatedCards.length > 0;
  const relatedCardSlots = Array.from(
    { length: 3 },
    (_, index) => relatedCards[index] ?? null,
  );

  if (!hasRelatedPosts) {
    return null;
  }

  return (
    <>
      <section className="pt-20">
        <div className="flex justify-between">
          <p className="text-2xl font-bold text-black">Related posts</p>
          <button
            type="button"
            onClick={openModal}
            className="interactive-hover group flex items-center justify-end gap-1 text-sm font-semibold text-black transition hover:text-[#c3ff3c]"
          >
            <span>New post</span>
            <ArrowIcon className="h-6 w-6" color="purple" />
          </button>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-3">
          {relatedCardSlots.map((card, index) =>
            card ? (
              <RelatedStoryCard key={card.id} card={card} />
            ) : (
              <div
                key={`related-card-placeholder-${index}`}
                className="hidden min-h-80 md:block"
                aria-hidden="true"
              />
            ),
          )}
        </div>
      </section>
      {isModalOpen ? <PostCreationModal onCloseAction={closeModal} /> : null}
    </>
  );
};
