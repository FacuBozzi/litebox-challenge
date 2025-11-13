import { ArrowIcon } from "@/components/ArrowIcon";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { Fragment } from "react";

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

const heroStory = {
  category: "Diversity & Inclusion",
  title: "Your Kid May Already Be Watching AI-Generated Videos on YouTube",
  summary:
    "The kids’ creator economy is already being reshaped by synthesized hosts and endless auto-generated episodes. The platforms are trying to keep up.",
  readTime: "6 mins",
  background:
    "url('/demo-blog-images/hero-image.png') center center / cover no-repeat",
};

type StoryCard = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  accent: string;
  background: string;
  layout?: string;
  contentAlignment?: "start" | "center" | "end";
  labelHeightClass?: string;
};

const storyCards: StoryCard[] = [
  {
    id: "studio-breakfast",
    category: "Tech companies",
    title:
      "Inside the studios reinventing corporate all-hands as immersive broadcasts",
    excerpt:
      "Lite Labs built a game-engine powered stage for founders to launch products straight to their employee base without rehearsals.",
    readTime: "5 mins",
    accent: "var(--color-background-yellow)",
    background:
      "radial-gradient(circle at 25% 20%, rgba(255,227,150,0.5), transparent 40%), radial-gradient(circle at 75% 30%, rgba(255,109,109,0.45), transparent 45%), linear-gradient(135deg, rgba(241,208,108,0.9), rgba(255,83,53,0.7))",
    layout: "md:row-span-2 md:min-h-[420px] lg:min-h-[520px]",
    contentAlignment: "end",
    labelHeightClass: "h-11",
  },
  {
    id: "crypto-crime",
    category: "Crypto",
    title:
      "Binance’s top crypto crime investigator is being detained in Nigeria",
    excerpt:
      "Nigeria’s EFCC alleges policy violations as the exchange fights a $10B penalty.",
    readTime: "6 mins",
    accent: "#a4f6ff",
    background:
      "radial-gradient(circle at 20% 20%, rgba(75,255,155,0.4), transparent 40%), linear-gradient(140deg, rgba(9,56,25,0.95), rgba(11,100,71,0.85))",
    labelHeightClass: "h-12",
  },
  {
    id: "signal-room",
    category: "Security",
    title: "The war room where ethical hackers rehearse global ransom drills",
    excerpt:
      "Shadow rehearsals every week are helping airports build muscle-memory when the alarms go dark.",
    readTime: "8 mins",
    accent: "#bda6ff",
    background:
      "radial-gradient(circle at 80% 20%, rgba(93,173,255,0.4), transparent 45%), linear-gradient(145deg, rgba(8,12,33,0.95), rgba(50,68,110,0.9))",
    labelHeightClass: "h-12",
  },
  {
    id: "founder-hangout",
    category: "Tech companies",
    title:
      "A stealth startup wants founders to treat LinkedIn like late-night TV",
    excerpt:
      "Litewave is paying on-air hosts to remix product launches into personality-driven talk shows.",
    readTime: "4 mins",
    accent: "var(--color-background-yellow)",
    background:
      "radial-gradient(circle at 15% 15%, rgba(195,255,60,0.35), transparent 40%), radial-gradient(circle at 75% 35%, rgba(255,131,208,0.3), transparent 40%), linear-gradient(135deg, rgba(28,28,28,0.95), rgba(18,18,18,0.85))",
    labelHeightClass: "h-12",
  },
  {
    id: "studio-breakfast2",
    category: "Tech companies",
    title:
      "Inside the studios reinventing corporate all-hands as immersive broadcasts",
    excerpt:
      "Lite Labs built a game-engine powered stage for founders to launch products straight to their employee base without rehearsals.",
    readTime: "5 mins",
    accent: "var(--color-background-yellow)",
    background:
      "radial-gradient(circle at 25% 20%, rgba(255,227,150,0.5), transparent 40%), radial-gradient(circle at 75% 30%, rgba(255,109,109,0.45), transparent 45%), linear-gradient(135deg, rgba(241,208,108,0.9), rgba(255,83,53,0.7))",
    layout: "md:row-span-2 md:min-h-[420px] lg:min-h-[520px]",
    contentAlignment: "end",
    labelHeightClass: "h-11",
  },
  {
    id: "crypto-crime2",
    category: "Crypto",
    title:
      "Binance’s top crypto crime investigator is being detained in Nigeria",
    excerpt:
      "Nigeria’s EFCC alleges policy violations as the exchange fights a $10B penalty.",
    readTime: "6 mins",
    accent: "#a4f6ff",
    background:
      "radial-gradient(circle at 20% 20%, rgba(75,255,155,0.4), transparent 40%), linear-gradient(140deg, rgba(9,56,25,0.95), rgba(11,100,71,0.85))",
    labelHeightClass: "h-12",
  },
  {
    id: "signal-room2",
    category: "Security",
    title: "The war room where ethical hackers rehearse global ransom drills",
    excerpt:
      "Shadow rehearsals every week are helping airports build muscle-memory when the alarms go dark.",
    readTime: "8 mins",
    accent: "#bda6ff",
    background:
      "radial-gradient(circle at 80% 20%, rgba(93,173,255,0.4), transparent 45%), linear-gradient(145deg, rgba(8,12,33,0.95), rgba(50,68,110,0.9))",
    labelHeightClass: "h-12",
  },
  {
    id: "founder-hangout2",
    category: "Tech companies",
    title:
      "A stealth startup wants founders to treat LinkedIn like late-night TV",
    excerpt:
      "Litewave is paying on-air hosts to remix product launches into personality-driven talk shows.",
    readTime: "4 mins",
    accent: "var(--color-background-yellow)",
    background:
      "radial-gradient(circle at 15% 15%, rgba(195,255,60,0.35), transparent 40%), radial-gradient(circle at 75% 35%, rgba(255,131,208,0.3), transparent 40%), linear-gradient(135deg, rgba(28,28,28,0.95), rgba(18,18,18,0.85))",
    labelHeightClass: "h-12",
  },
  {
    id: "founder-hangout3",
    category: "Tech companies",
    title:
      "A stealth startup wants founders to treat LinkedIn like late-night TV",
    excerpt:
      "Litewave is paying on-air hosts to remix product launches into personality-driven talk shows.",
    readTime: "4 mins",
    accent: "var(--color-background-yellow)",
    background:
      "radial-gradient(circle at 15% 15%, rgba(195,255,60,0.35), transparent 40%), radial-gradient(circle at 75% 35%, rgba(255,131,208,0.3), transparent 40%), linear-gradient(135deg, rgba(28,28,28,0.95), rgba(18,18,18,0.85))",
    labelHeightClass: "h-12",
  },
];

const mostViewed = [
  {
    title: "Your TV Sounds Awful. These Soundbars Can Fix That",
    meta: "Gear • 9 mins",
    accent:
      "radial-gradient(circle at 20% 20%, rgba(255,196,241,0.5), transparent 60%), linear-gradient(135deg, #e000ff, #7700ff)",
  },
  {
    title: "The Small Company at the Center of 'Gamergate 2.0'",
    meta: "Culture • 7 mins",
    accent:
      "radial-gradient(circle at 70% 20%, rgba(255,210,136,0.6), transparent 55%), linear-gradient(135deg, #ff7a18, #ff0057)",
  },
  {
    title:
      "Craig Wright Is Not Bitcoin Creator Satoshi Nakamoto, Judge Declares",
    meta: "Courts • 5 mins",
    accent:
      "radial-gradient(circle at 20% 80%, rgba(182,208,255,0.55), transparent 50%), linear-gradient(135deg, #2f68ff, #11152b)",
  },
  {
    title:
      "Robert F. Kennedy Jr. Targets a Generation of Politically Disaffected, Extremely Online Men",
    meta: "Politics • 12 mins",
    accent:
      "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.35), transparent 60%), linear-gradient(135deg, #ffef9f, #f0941f)",
  },
];

const FileIcon = ({ className = "w-5 h-5" }: { className?: string } = {}) => (
  <Image
    src="/misc/file-icon.svg"
    alt="file icon"
    width={20}
    height={20}
    className={className}
  />
);

export default function Home() {
  const storyGroups: StoryCard[][] = [];
  for (let i = 0; i < storyCards.length; i += 3) {
    storyGroups.push(storyCards.slice(i, i + 3));
  }

  const NewsletterBanner = () => (
    <div className="border border-white/10 bg-purple px-4 py-8 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 md:px-10 md:py-9">
      <p className="text-lg font-normal leading-relaxed sm:max-w-3xl sm:text-[1.45rem]">
        Sign up for our newsletter{" "}
        <span className="font-semibold">and get daily updates</span>
      </p>
      <button className="mt-6 inline-flex items-center justify-center bg-background-yellow px-7.5 py-3 text-sm font-medium text-black transition hover:bg-background-yellow/80 sm:mt-0">
        Subscribe
      </button>
    </div>
  );

  const renderStoryCard = (
    story: StoryCard,
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
            </div>
            <div
              className={`mt-1 flex items-center justify-between ${
                isCompact ? "text-sm font-semibold" : "text-md font-semibold"
              }`}
            >
              <button
                className={`group flex items-center gap-1 transition hover:text-background-yellow ${
                  isCompact ? "text-sm" : "text-base"
                }`}
              >
                Read
                <ArrowIcon
                  className="h-6 w-6 transition group-hover:translate-x-1"
                  color="purple"
                />
              </button>
              <div className="flex text-sm font-normal items-center gap-2 text-extra-muted">
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
    <div className="min-h-screen bg-[#030304] px-4 py-6 pt-0 text-white sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <Navbar />

        <section className="space-y-5">
          <p className="text-md font-semibold text-white">Today story</p>
          <article
            className="relative h-80 flex items-center overflow-hidden border border-white/10"
            style={{ background: heroStory.background }}
          >
            {/*<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />*/}

            <div className="relative ml-7">
              {/* Black clipped hero card */}
              <div className="inline-flex h-12 items-end justify-center bg-black px-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-background-yellow px-3 py-[0.3rem] text-xs font-semibold text-black">
                  {heroStory.category}
                </div>
              </div>

              <div className="w-123 px-0 py-6 pl-6 bg-black flex flex-col flex-start">
                <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                  {heroStory.title}
                </h1>
                <div className="flex mt-3 justify-between">
                  <button className="flex items-center gap-1 rounded-full text-sm font-semibold hover:bg-white/5">
                    Read
                    <ArrowIcon className="h-6 w-6" color="purple" />
                  </button>
                  <div className="flex pr-6 items-center font-normal gap-2 text-sm text-extra-muted">
                    <FileIcon className="h-4 w-4" />
                    {heroStory.readTime}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="space-y-6 mt-5">
          <div className="flex items-center">
            <p className="font-bold mr-5">Topics</p>
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
            <div className="flex flex-col gap-8">
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
                      className={`grid grid-cols-1 gap-7 md:grid-cols-2 md:auto-rows-[minmax(340px,_1fr)] ${gridColsClass}`}
                    >
                      {orderedCards
                        .filter((card): card is StoryCard => Boolean(card))
                        .map((story) =>
                          renderStoryCard(
                            story,
                            story.id === featureCard?.id
                              ? "feature"
                              : "compact",
                          ),
                        )}
                    </div>
                    {groupIndex === 0 && <NewsletterBanner />}
                  </Fragment>
                );
              })}
            </div>

            <aside className="w-full">
              <h2 className="text-md font-semibold text-white">Most viewed</h2>
              <div className="mt-4 space-y-3">
                {mostViewed.map((item) => (
                  <article
                    key={item.title}
                    className="flex gap-2 border-b border-extra-muted pb-3"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-semibold leading-snug text-muted">
                        {item.title}
                      </p>
                    </div>
                    <div
                      className="h-19 w-19 shrink-0"
                      style={{ background: item.accent }}
                    />
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
