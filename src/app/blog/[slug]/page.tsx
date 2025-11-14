import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import { ArrowIcon } from "@/components/ArrowIcon";
import { MostViewed } from "@/components/MostViewed";
import { getApiConfig, fetchPosts } from "@/lib/api";
import {
  mapPostsToMostViewedItems,
  fallbackMostViewedItems,
} from "@/lib/mostViewed";
import type { PostEntity } from "@/types/posts";
import { matchesPostSlug } from "@/lib/posts";

const ARTICLE_BODY = `# Curabitur sit amet sapien at velit fringilla tincidunt porttitor eget lacus. Sed mauris libero,
malesuada et venenatis vitae, porta ac enim. Curabitur sit amet sapien at velit fringilla
tincidunt porttitor eget lacus. Sed mauris libero, malesuada et venenatis vitae, porta ac enim.
Aliquam erat volutpat. Cras tristique eleifend dolor, et ultricies nisl feugiat sed. Pellentesque
blandit orci eu velit vehicula commodo. Phasellus imperdiet finibus ex eget gravida. Maecenas
vitae molestie dolor. Nulla hendrerit ipsum leo, in tempor urna interdum ut. Sed molestie sodales
quam. Mauris sollicitudin metus at eros imperdiet, vitae pulvinar nunc condimentum. Pellentesque
rhoncus, lacus sit amet mollis placerat, nulla lectus maximus justo, quis gravida elit augue id.

![imagen
blog](https://litetech-assets.s3.us-east-2.amazonaws.com/Image.png)

# Pellentesque venenatis arcu lectu Maecenas iaculis et dolor ac laoreet. Curabitur placerat porta
dolor. Quisque consectetur vitae odio ac posuere. Nullam tristique tellus purus, quis aliquet
purus sodales sed. Sed hendrerit gravida augue luctus suscipit. Maecenas id faucibus magna. Sed
placerat orci ac orci blandit, at porta ante ornare. Praesent tristique sollicitudin fringilla.
Morbi at laoreet enim, sed viverra ligula. Sed laoreet, elit vel faucibus semper, urna ante
euismod sem, accumsan volutpat augue ante ut elit. Phasellus rutrum, nulla vitae euismod blandit,
elit nisi placerat neque, vitae facilisis massa sapien a mi. Fusce sit amet blandit lectus.

![imagen
blog](https://litetech-assets.s3.us-east-2.amazonaws.com/Image2.png)

> Commodo eget mi. In orci nunc, laoreet eleifend sem vel, suscipitlon lorem ipsum
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel sem in nunc porttitor dapibus a sollicitudin nunc. Sed lacinia nisl a magna congue, maximus tristique tellus finibus.

# Nullam tristique tellus purus Maecenas iaculis et dolor ac laoreet. Curabitur placerat porta
dolor. Quisque consectetur vitae odio ac posuere. Nullam tristique tellus purus, quis aliquet
purus sodales sed. Sed hendrerit gravida augue luctus suscipit. Maecenas id faucibus magna. Sed
placerat orci ac orci blandit, at porta ante ornare. Praesent tristique sollicitudin fringilla.
Morbi at laoreet enim, sed viverra ligula. Sed laoreet, elit vel faucibus semper, urna ante
euismod sem, accumsan volutpat augue ante ut elit. Phasellus rutrum, nulla vitae euismod blandit,
elit nisi placerat neque, vitae facilisis massa sapien a mi. Fusce sit amet blandit lectus.
`;

const formatReadTime = (value?: number, fallback = "— mins read") =>
  typeof value === "number" && Number.isFinite(value)
    ? `${value} mins read`
    : fallback;

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "—";
  }
};

const FileIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <Image
    src="/misc/file-icon.svg"
    alt="file icon"
    width={20}
    height={20}
    className={className}
  />
);

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h2 className="mt-10 text-3xl font-semibold leading-tight text-white first:mt-0">
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-base leading-relaxed text-white/90">{children}</p>
  ),
  img: ({ alt, src }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src ?? ""}
      alt={alt ?? ""}
      className="my-8 w-full rounded-xl border border-white/10 bg-black/40 object-cover"
      loading="lazy"
    />
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-background-yellow bg-white/5 p-6 text-lg italic text-white">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-white/90">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-white/90">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
};

type BlogArticleParams = Promise<{ slug?: string }>;

export default async function BlogArticle({
  params,
}: {
  params: BlogArticleParams;
}) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }
  const { baseUrl: normalizedBaseUrl, host: normalizedHost } = getApiConfig();

  let postsData: PostEntity[] = [];
  try {
    postsData = await fetchPosts(normalizedHost, 14);
  } catch (error) {
    console.error("Failed to fetch posts for article", error);
  }

  const targetPost =
    postsData.find((entry) => matchesPostSlug(entry, slug)) ??
    postsData.find((entry) => String(entry.id) === slug);
  if (!targetPost) {
    notFound();
  }

  const attrs = targetPost.attributes ?? {};
  const coverUrl = attrs.coverImg?.data?.attributes?.url;
  const topicLabel = attrs.topic ?? "General";
  const authorName = attrs.author ?? "Lite-Tech Editorial";
  const heroBackground = coverUrl
    ? `url(${normalizedBaseUrl}${coverUrl}) center center / cover no-repeat`
    : "linear-gradient(135deg, #1f1f1f, #0f0f0f)";
  const heroWrapperStyles = {
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
    transform: "translateY(calc(-1 * (var(--navbar-height, 0px) + 2.5rem)))",
  };

  const mostViewedSource = postsData.filter(
    (entry) => entry.id !== targetPost.id,
  );
  const mostViewedPosts =
    mostViewedSource.length > 4 ? mostViewedSource.slice(-4) : mostViewedSource;

  const mostViewedItems =
    mostViewedPosts.length > 0
      ? mapPostsToMostViewedItems(mostViewedPosts, normalizedBaseUrl)
      : fallbackMostViewedItems;

  return (
    <>
      <div className="relative w-screen" style={heroWrapperStyles}>
        <div className="relative h-[700px] w-full overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: heroBackground }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/60" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center px-4 sm:px-8">
            <div className="relative w-full max-w-[500px] -ml-5 text-white">
              <div className="flex w-fit items-end h-16 bg-white px-6">
                <div className="inline-flex items-center gap-4">
                  <Image
                    src="/authors/avatar-photo.png"
                    alt={`${authorName} avatar`}
                    width={48}
                    height={48}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="text-lg font-normal text-extra-muted">
                    By {authorName}
                  </span>
                </div>
              </div>
              <div className="flex w-123 -mt-px flex-col bg-white px-6 py-6">
                <h1 className="text-3xl text-black font-semibold leading-tight md:text-4xl">
                  {attrs.title ?? "Untitled Post"}
                </h1>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 pr-6 text-sm font-normal text-extra-muted">
                    <FileIcon />
                    {formatReadTime(attrs.readTime ?? undefined)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-background-yellow"
        >
          <ArrowIcon className="h-5 w-5 -rotate-180" />
          Back to briefings
        </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="space-y-10" id="article-content">
            <div className="overflow-hidden rounded-2xl bg-black/30">
              <div className="space-y-5 p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-background-yellow px-3 py-1 text-xs font-semibold text-black">
                  {topicLabel}
                </div>
                <div className="space-y-3">
                  <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                    {attrs.title ?? "Untitled Post"}
                  </h1>
                  {attrs.subtitle ? (
                    <p className="text-base text-white/80">{attrs.subtitle}</p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-6 text-sm text-white/70">
                  <div className="flex flex-col">
                    <span className="text-white">By {authorName}</span>
                    <span className="text-white/60">
                      {formatDate(attrs.publishedAt ?? attrs.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    {formatReadTime(attrs.readTime ?? undefined)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <ReactMarkdown components={markdownComponents}>
                {ARTICLE_BODY}
              </ReactMarkdown>
            </div>
          </article>

          <MostViewed heading="Related headlines" items={mostViewedItems} />
        </div>
      </div>
    </>
  );
}
