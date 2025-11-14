export function NewsletterBanner() {
  return (
    <div className="flex flex-col items-center gap-6 border border-white/10 bg-purple px-10 py-8 text-center text-white sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-left md:px-10 md:py-9">
      <p className="text-2xl text-left font-normal sm:max-w-3xl sm:text-[1.45rem]">
        Sign up for our newsletter{" "}
        <span className="font-semibold">and get daily updates</span>
      </p>
      <button
        type="button"
        className="interactive-hover w-full md:w-32 inline-flex items-center justify-center bg-background-yellow px-7.5 py-3 text-sm font-medium text-black"
      >
        Subscribe
      </button>
    </div>
  );
}
