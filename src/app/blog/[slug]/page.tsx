import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import { MostViewed } from "@/components/MostViewed";
import { FileIcon } from "@/components/FileIcon";
import { RelatedPostsSection } from "@/components/blog/RelatedPostsSection";
import { getApiConfig, fetchPosts } from "@/lib/api";
import { fetchRelatedPosts } from "@/lib/relatedPosts";
import {
  mapPostsToMostViewedItems,
  fallbackMostViewedItems,
} from "@/lib/mostViewed";
import type { PostEntity } from "@/types/posts";
import type { RelatedPost } from "@/types/relatedPosts";
import { matchesPostSlug } from "@/lib/posts";

const ARTICLE_BODY = `# Curabitur sit amet sapien at velit fringilla tincidunt porttitor eget lacus. Sed mauris libero, malesuada et venenatis vitae, porta ac enim.

  Curabitur sit amet sapien at velit fringilla
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

const socialMediaPlatforms = [
  {
    id: "linkedin",
    label: "LinkedIn",
    logo: "/social-media/linkedin-black-logo.svg",
  },
  {
    id: "facebook",
    label: "Facebook",
    logo: "/social-media/facebook-black-logo.svg",
  },
  { id: "x", label: "X", logo: "/social-media/x-black-logo.svg" },
] as const;

const SocialMediaSection = () => (
  <aside className="w-full">
    <h2 className="text-md font-semibold text-black">Share on</h2>
    <div className="mt-7 flex gap-6">
      {socialMediaPlatforms.map((platform) => (
        <div
          key={platform.id}
          className="flex w-fit cursor-pointer items-center justify-center"
        >
          <Image
            src={platform.logo}
            alt={`${platform.label} logo`}
            width={48}
            height={48}
            className="h-6 w-6 object-contain"
          />
        </div>
      ))}
    </div>
  </aside>
);

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h2 className="mt-12 text-lg font-semibold leading-tight text-black first:mt-0">
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p className="mt-6 text-sm leading-relaxed text-extra-muted">{children}</p>
  ),
  img: ({ alt, src }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src ?? ""}
      alt={alt ?? ""}
      className="my-16 w-full border border-white/10 bg-black/40 object-cover"
      loading="lazy"
    />
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-background-yellow bg-white/5 p-6 my-14 ml-5 [&_p]:text-xl! [&_p]:mt-0! [&_p]:text-black! font-bold text-white">
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

  let relatedPosts: RelatedPost[] = [];
  try {
    relatedPosts = await fetchRelatedPosts(normalizedHost);
  } catch (error) {
    console.error("Failed to fetch related posts for article", error);
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-white" aria-hidden="true" />
      <div className="relative w-screen" style={heroWrapperStyles}>
        <div className="relative h-[480px] w-full overflow-hidden md:h-[700px]">
          <div
            className="absolute inset-0"
            style={{ background: heroBackground }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/60" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-start px-4 pt-[calc(var(--navbar-height,0px)+2.5rem)] sm:px-8 md:justify-center md:pt-0">
            <Link
              href="/"
              className="relative z-10 mb-4 flex w-full px-0 gap-2 text-white md:mb-6"
            >
              <Image
                src="/arrows/left-arrow.svg"
                width={20}
                height={20}
                alt="arrow left"
              />
              <p className="font-semibold">Blog</p>
            </Link>
            <div className="absolute z-0 left-1/2 top-1/2 w-full max-w-[460px] mt-4 md:mt-0 -translate-x-1/2 -translate-y-1/2 px-6 sm:pl-0 sm:pr-0 md:relative md:left-auto md:top-auto md:mx-0 md:max-w-[500px] md:translate-x-0 md:translate-y-0 md:pl-0 md:z-auto">
              <div className="inline-flex h-12 w-fit items-end justify-center bg-white px-6 md:h-16">
                <div className="inline-flex items-center gap-4">
                  <Image
                    src="/authors/avatar-photo.png"
                    alt={`${authorName} avatar`}
                    width={48}
                    height={48}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-extra-muted md:text-lg md:font-normal">
                    By {authorName}
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col bg-white px-6 py-5 text-black -mt-2 md:w-123 md:px-6 md:py-6">
                <h1 className="text-3xl font-semibold leading-tight text-black md:text-4xl">
                  {attrs.title ?? "Untitled Post"}
                </h1>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm font-normal text-extra-muted md:pr-6">
                    <FileIcon />
                    {formatReadTime(attrs.readTime ?? undefined)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-10 space-y-10">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
          <div className="order-2 lg:order-none">
            <SocialMediaSection />
          </div>
          <article
            className="order-1 space-y-10 lg:order-none"
            id="article-content"
          >
            <div className="space-y-6">
              <ReactMarkdown components={markdownComponents}>
                {ARTICLE_BODY}
              </ReactMarkdown>
            </div>
          </article>

          <div className="order-3 hidden lg:order-none lg:block">
            <MostViewed items={mostViewedItems} lightMode />
          </div>
        </div>

        <RelatedPostsSection
          relatedPosts={relatedPosts}
          apiHost={normalizedHost}
        />
      </div>
    </>
  );
}
