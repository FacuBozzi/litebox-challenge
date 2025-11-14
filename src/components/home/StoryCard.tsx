import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { FileIcon } from "@/components/FileIcon";
import type { StoryCardWithSlug } from "@/components/home/types";

type StoryCardProps = {
  story: StoryCardWithSlug;
  variant: "feature" | "compact";
};

const resolveAlignmentClass = (
  alignment: StoryCardWithSlug["contentAlignment"],
  isCompact: boolean,
) => {
  if (alignment === "start") {
    return "items-start";
  }
  if (alignment === "center") {
    return "items-center";
  }
  return isCompact ? "items-end" : "items-end md:pb-6";
};

export function StoryCard({ story, variant }: StoryCardProps) {
  const isCompact = variant === "compact";
  const alignmentClass = resolveAlignmentClass(
    story.contentAlignment,
    isCompact,
  );
  const spanClass = !isCompact && !story.layout ? "md:row-span-2" : "";

  return (
    <article
      className={`story-card-mobile-tall relative flex h-full overflow-hidden border border-white/10 px-4 md:px-0 md:pl-6 ${alignmentClass} ${story.layout ?? ""} ${spanClass} transform-gpu transition-transform duration-300 ease-out hover:scale-[1.015] focus-within:scale-[1.015]`}
      style={{ background: story.background }}
    >
      <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[repeating-linear-gradient(45deg,_rgba(255,255,255,0.05)_0,_rgba(255,255,255,0.05)_2px,_transparent_2px,_transparent_8px)]" />
      <div className="relative mx-auto w-full max-w-[460px] px-4 md:pr-6 text-black sm:pl-0 lg:max-w-[520px]">
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
          className={`flex flex-col -mt-px gap-2 bg-white px-6 ${
            isCompact ? "py-3 mb-6" : "py-3 mb-6 md:py-5 md:mb-0"
          }`}
        >
          <div className="space-y-3">
            <h3
              className={`story-title-clamp ${
                isCompact
                  ? "text-base font-bold leading-normal"
                  : "text-base font-bold leading-normal md:text-lg md:font-semibold md:leading-tight"
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
              isCompact
                ? "text-sm font-semibold"
                : "text-sm font-semibold md:text-md"
            }`}
          >
            {story.slug ? (
              <Link
                href={`/blog/${story.slug}`}
                className={`group flex items-center gap-1 transition-colors ${
                  isCompact ? "text-sm" : "text-sm md:text-base"
                }`}
              >
                Read
                <ArrowIcon
                  className="h-6 w-6 transition group-hover:translate-x-1"
                  color="purple"
                />
              </Link>
            ) : (
              <span
                className={`group flex cursor-not-allowed items-center gap-1 opacity-60 ${
                  isCompact ? "text-sm" : "text-sm md:text-base"
                }`}
                aria-disabled="true"
              >
                Read
                <ArrowIcon className="h-6 w-6" color="purple" />
              </span>
            )}
            <div className="flex items-center gap-2 text-sm font-normal text-extra-muted">
              <FileIcon className="h-4 w-4" />
              {story.readTime}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
