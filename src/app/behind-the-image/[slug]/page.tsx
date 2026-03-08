import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getStoryBySlug, getStories, getImageBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const stories = getStories();
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  const coverImage = getImageBySlug(story.coverImage);
  const relatedImages = story.relatedImages
    ?.map((slug) => getImageBySlug(slug))
    .filter((img) => img !== null);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/behind-the-image"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Stories
        </Link>

        {/* Story Header */}
        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {story.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {new Date(story.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          {/* Cover Image */}
          {coverImage && (
            <div className="mb-12">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={coverImage.image}
                  alt={coverImage.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
                {coverImage.title}
                {coverImage.location && ` — ${coverImage.location}`}
              </p>
            </div>
          )}

          {/* Story Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-gray-100">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-900 dark:text-gray-100">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-2">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-6 text-gray-600 dark:text-gray-400">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {story.content}
            </ReactMarkdown>
          </div>

          {/* Related Images */}
          {relatedImages && relatedImages.length > 0 && (
            <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Related Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedImages.map((img) => (
                  <Link
                    key={img!.slug}
                    href={`/gallery/${img!.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={img!.image}
                        alt={img!.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="mt-3 font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {img!.title}
                    </h3>
                    {img!.location && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {img!.location}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
