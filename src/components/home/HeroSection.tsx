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
        className="story-card-mobile-tall relative flex min-h-[360px] items-end overflow-hidden border border-white/10 px-4 pb-6 text-white md:h-80 md:items-center md:px-0 md:pb-0"
        style={{ background: story.background }}
      >
        <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[repeating-linear-gradient(45deg,_rgba(255,255,255,0.05)_0,_rgba(255,255,255,0.05)_2px,_transparent_2px,_transparent_8px)]" />
        <div className="relative mx-auto w-full max-w-[460px] pl-6 pr-6 text-white sm:pl-0 lg:max-w-[520px] md:ml-7 md:mr-0 md:w-123">
          <div className="inline-flex h-12 items-end justify-center bg-black px-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-background-yellow px-3 py-[0.3rem] text-xs font-semibold text-black">
              {story.category}
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-black px-6 py-5 text-white md:px-6 md:py-6">
            <h1 className="text-lg font-semibold leading-tight md:text-4xl">
              {story.title}
            </h1>
            <div className="md:mt-3 flex items-center justify-between">
              {slug ? (
                <Link
                  href={`/blog/${slug}`}
                  className="interactive-hover flex items-center gap-1 rounded-full text-sm font-semibold text-white"
                >
                  Read
                  <ArrowIcon className="h-6 w-6" color="purple" />
                </Link>
              ) : (
                <span
                  className="interactive-hover flex cursor-not-allowed items-center gap-1 rounded-full text-sm font-semibold text-white opacity-60"
                  aria-disabled="true"
                >
                  Read
                  <ArrowIcon className="h-6 w-6" color="purple" />
                </span>
              )}
              <div className="flex items-center gap-2 text-sm font-normal text-extra-muted md:pr-6">
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
