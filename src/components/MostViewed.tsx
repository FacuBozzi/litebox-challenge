import Link from "next/link";

export type MostViewedItem = {
  id: string;
  title: string;
  background: string;
  slug?: string;
};

type MostViewedProps = {
  heading?: string;
  items: MostViewedItem[];
  lightMode?: boolean;
};

export function MostViewed({
  heading = "Most viewed",
  items,
  lightMode = false,
}: MostViewedProps) {
  return (
    <aside className="w-full">
      <h2
        className={`text-md font-semibold ${lightMode ? "text-black" : "text-white"}`}
      >
        {heading}
      </h2>
      <div className="mt-6 space-y-3">
        {items.map((item) => {
          const content = (
            <>
              <div className="space-y-2">
                <p className="text-sm font-semibold leading-snug text-muted">
                  {item.title}
                </p>
              </div>
              <div
                className="h-19 w-19 shrink-0"
                style={{ background: item.background }}
              />
            </>
          );

          if (item.slug) {
            return (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                className="flex justify-between gap-2 border-b border-extra-muted pb-3 transition hover:text-background-yellow"
              >
                {content}
              </Link>
            );
          }

          return (
            <article
              key={item.id}
              className="flex justify-between gap-2 border-b border-extra-muted pb-3"
            >
              {content}
            </article>
          );
        })}
      </div>
    </aside>
  );
}
