import { Fragment } from "react";
import { MostViewed, type MostViewedItem } from "@/components/MostViewed";
import { StoryCard } from "@/components/home/StoryCard";
import type { StoryCardWithSlug } from "@/components/home/types";

type StoriesSectionProps = {
  storyGroups: StoryCardWithSlug[][];
  mostViewedHeading: string;
  mostViewedItems: MostViewedItem[];
};

export function StoriesSection({
  storyGroups,
  mostViewedHeading,
  mostViewedItems,
}: StoriesSectionProps) {
  return (
    <section className="space-y-6">
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="mb-40 flex flex-col gap-12">
          {storyGroups.map((group, groupIndex) => {
            if (group.length === 0) return null;

            const featureIndex = group.findIndex((story) =>
              story.layout?.includes("row-span-2"),
            );
            const resolvedFeatureIndex = featureIndex === -1 ? 0 : featureIndex;
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
                    .filter((card): card is StoryCardWithSlug => Boolean(card))
                    .map((story) => (
                      <StoryCard
                        key={story.id}
                        story={story}
                        variant={
                          story.id === featureCard?.id ? "feature" : "compact"
                        }
                      />
                    ))}
                </div>
                {groupIndex === 0 && (
                  <div className="border border-white/10 bg-purple px-4 py-8 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 md:px-10 md:py-9">
                    <p className="text-lg font-normal leading-relaxed sm:max-w-3xl sm:text-[1.45rem]">
                      Sign up for our newsletter{" "}
                      <span className="font-semibold">
                        and get daily updates
                      </span>
                    </p>
                    <button
                      type="button"
                      className="interactive-hover mt-6 inline-flex items-center justify-center bg-background-yellow px-7.5 py-3 text-sm font-medium text-black sm:mt-0"
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </Fragment>
            );
          })}
          <button
            type="button"
            className="interactive-hover mx-auto mt-2 inline-flex items-center justify-center bg-background-yellow px-7 py-[0.8rem] text-md font-medium text-black"
          >
            Load more
          </button>
        </div>

        <MostViewed heading={mostViewedHeading} items={mostViewedItems} />
      </div>
    </section>
  );
}
