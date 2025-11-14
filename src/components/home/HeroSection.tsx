import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { FileIcon } from "@/components/FileIcon";
import type { HeroStory } from "@/components/home/types";

type HeroSectionProps = {
  story: HeroStory;
  slug?: string;
};

export function HeroSection({ story, slug }: HeroSectionProps) {
  return (
    <section className="space-y-5">
      <p className="text-md font-semibold text-white">Today story</p>
      <article
        className="relative flex h-80 items-center overflow-hidden border border-white/10"
        style={{ background: story.background }}
      >
        <div className="relative ml-7">
          <div className="inline-flex h-12 items-end justify-center bg-black px-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-background-yellow px-3 py-[0.3rem] text-xs font-semibold text-black">
              {story.category}
            </div>
          </div>

          <div className="flex w-123 flex-col bg-black px-6 py-6">
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              {story.title}
            </h1>
            <div className="mt-3 flex justify-between">
              {slug ? (
                <Link
                  href={`/blog/${slug}`}
                  className="interactive-hover flex items-center gap-1 rounded-full text-sm font-semibold"
                >
                  Read
                  <ArrowIcon className="h-6 w-6" color="purple" />
                </Link>
              ) : (
                <span
                  className="interactive-hover flex cursor-not-allowed items-center gap-1 rounded-full text-sm font-semibold opacity-60"
                  aria-disabled="true"
                >
                  Read
                  <ArrowIcon className="h-6 w-6" color="purple" />
                </span>
              )}
              <div className="flex items-center gap-2 pr-6 text-sm font-normal text-extra-muted">
                <FileIcon className="h-4 w-4" />
                {story.readTime}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
