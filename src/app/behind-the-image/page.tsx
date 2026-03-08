import Link from "next/link";
import Image from "next/image";
import { getStories, getImageBySlug } from "@/lib/content";

export default function StoriesPage() {
  const stories = getStories();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Behind the Image</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Stories, reflections, and the moments that shaped each photograph
          </p>
        </div>

        {/* Stories Grid */}
        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story) => {
              const coverImg = getImageBySlug(story.coverImage);
              return (
                <article
                  key={story.slug}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/behind-the-image/${story.slug}`}>
                    <div className="relative aspect-video">
                      {coverImg ? (
                        <Image
                          src={coverImg.image}
                          alt={story.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-400">No cover image</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/behind-the-image/${story.slug}`}>
                      <h2 className="text-2xl font-semibold mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {story.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                      {new Date(story.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {story.content.replace(/^#+\s/gm, "").slice(0, 200)}...
                    </p>
                    <Link
                      href={`/behind-the-image/${story.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No stories yet. Check back soon for behind-the-scenes content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
