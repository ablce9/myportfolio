import Link from "next/link";
import Image from "next/image";
import { getImages, getStories, getImageBySlug } from "@/lib/content";

export default function Home() {
  const images = getImages();
  const stories = getStories();
  const featuredImages = images.filter((img) => img.featured).slice(0, 6);
  const displayImages = featuredImages.length > 0 ? featuredImages : images.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Shun&apos;s World</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover stunning images and the stories behind them
        </p>
      </section>

      {/* Featured Images Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.length > 0 ? (
            displayImages.map((img) => (
              <Link
                key={img.slug}
                href={`/gallery/${img.slug}`}
                className="group block relative rounded-lg overflow-hidden"
              >
                <Image
                  src={img.image}
                  alt={img.title}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                  <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="font-semibold">{img.title}</h3>
                    {img.location && (
                      <p className="text-sm text-gray-300">{img.location}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-3">No images yet. Add some to content/images/</p>
          )}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/gallery"
            className="inline-block px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
          >
            View All Images
          </Link>
        </div>
      </section>

      {/* Behind the Image Preview */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Behind the Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.length > 0 ? (
            stories.slice(0, 2).map((story) => {
              const coverImg = getImageBySlug(story.coverImage);
              return (
                <div
                  key={story.slug}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video">
                    {coverImg ? (
                      <Image
                        src={coverImg.image}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400">No cover image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {story.content.slice(0, 150)}...
                    </p>
                    <Link
                      href={`/behind-the-image/${story.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 col-span-2">No stories yet. Add some to content/stories/</p>
          )}
        </div>
        {stories.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/behind-the-image"
              className="inline-block px-6 py-3 border border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
            >
              All Stories
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
