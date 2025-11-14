import { Fragment } from "react";
import { MostViewed, type MostViewedItem } from "@/components/MostViewed";
import { StoryCard } from "@/components/home/StoryCard";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
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
        <div className="sm:mb-40 mb-12 flex flex-col gap-12">
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
                {groupIndex === 0 && <NewsletterBanner />}
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

        <div className="hidden lg:block">
          <MostViewed heading={mostViewedHeading} items={mostViewedItems} />
        </div>
      </div>
    </section>
  );
}
