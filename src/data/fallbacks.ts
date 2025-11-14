export type StoryCard = {
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

export const fallbackHeroStory = {
  category: "Diversity & Inclusion",
  title: "Your Kid May Already Be Watching AI-Generated Videos on YouTube",
  summary:
    "The kids’ creator economy is already being reshaped by synthesized hosts and endless auto-generated episodes. The platforms are trying to keep up.",
  readTime: "6 mins",
  background:
    "url('/demo-blog-images/hero-image.png') center center / cover no-repeat",
};

export const fallbackBackgrounds = [
  "radial-gradient(circle at 25% 20%, rgba(255,227,150,0.5), transparent 40%), radial-gradient(circle at 75% 30%, rgba(255,109,109,0.45), transparent 45%), linear-gradient(135deg, rgba(241,208,108,0.9), rgba(255,83,53,0.7))",
  "radial-gradient(circle at 20% 20%, rgba(75,255,155,0.4), transparent 40%), linear-gradient(140deg, rgba(9,56,25,0.95), rgba(11,100,71,0.85))",
  "radial-gradient(circle at 80% 20%, rgba(93,173,255,0.4), transparent 45%), linear-gradient(145deg, rgba(8,12,33,0.95), rgba(50,68,110,0.9))",
  "radial-gradient(circle at 15% 15%, rgba(195,255,60,0.35), transparent 40%), radial-gradient(circle at 75% 35%, rgba(255,131,208,0.3), transparent 40%), linear-gradient(135deg, rgba(28,28,28,0.95), rgba(18,18,18,0.85))",
];

export const fallbackStoryCards: StoryCard[] = [
  {
    id: "studio-breakfast",
    category: "Tech companies",
    title:
      "Inside the studios reinventing corporate all-hands as immersive broadcasts",
    excerpt:
      "Lite Labs built a game-engine powered stage for founders to launch products straight to their employee base without rehearsals.",
    readTime: "5 mins",
    accent: "var(--color-background-yellow)",
    background: fallbackBackgrounds[0],
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
    background: fallbackBackgrounds[1],
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
    background: fallbackBackgrounds[2],
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
    background: fallbackBackgrounds[3],
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
    background: fallbackBackgrounds[0],
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
    background: fallbackBackgrounds[1],
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
    background: fallbackBackgrounds[2],
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
    background: fallbackBackgrounds[3],
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
    background: fallbackBackgrounds[3],
    labelHeightClass: "h-12",
  },
];

export const fallbackMostViewedPosts = [
  {
    title: "Your TV Sounds Awful. These Soundbars Can Fix That",
    accent: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  },
  {
    title: "The Most Exciting Cars of 2025 (So Far)",
    accent: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
  {
    title:
      "Matter Is a Powerful Smart Home Standard. But It’s Still Not for Everyone",
    accent: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  },
  {
    title: "The Best Gear to Get the Most Out of Summer 2025",
    accent: "linear-gradient(135deg, #fdc830 0%, #f37335 100%)",
  },
];

export const fallbackMostViewedAccents = fallbackMostViewedPosts.map(
  (seed) => seed.accent,
);
