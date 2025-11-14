import type { TopicFilter } from "@/data/topics";

type TopicsSectionProps = {
  topics: TopicFilter[];
};

export function TopicsSection({ topics }: TopicsSectionProps) {
  return (
    <section className="mt-5">
      <div className="flex items-center">
        <p className="mr-5 font-bold">Topics</p>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <button
              key={`${topic.label}-${index}`}
              type="button"
              className={`interactive-hover flex items-end gap-2 rounded-full border px-3 py-2 text-sm font-normal transition ${
                topic.active
                  ? "border-transparent bg-background-yellow text-black"
                  : "border-white/15 bg-black/30 text-muted"
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
    </section>
  );
}
