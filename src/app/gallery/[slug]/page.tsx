import Link from "next/link";
import { notFound } from "next/navigation";
import { getImageBySlug, getImages, getFullResolutionUrl } from "@/lib/content";
import ImageLightbox from "@/components/ImageLightbox";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const images = getImages();
  return images.map((img) => ({
    slug: img.slug,
  }));
}

export default async function ImageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const image = getImageBySlug(slug);

  if (!image) {
    notFound();
  }

  const fullResolutionUrl = getFullResolutionUrl(image.image, image.originalImage);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Navigation */}
      <Link
        href="/gallery"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-foreground mb-8"
      >
        ← Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image with Lightbox */}
        <ImageLightbox
          src={image.image}
          alt={image.title}
          fullResolutionSrc={fullResolutionUrl}
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{image.title}</h1>
          {image.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {image.description}
            </p>
          )}

          <div className="space-y-4 mb-8">
            {image.capturedAt && (
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  Date
                </span>
                <p>{image.capturedAt}</p>
              </div>
            )}
            {image.location && (
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  Location
                </span>
                <p>{image.location}</p>
              </div>
            )}
            {image.tags && image.tags.length > 0 && (
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  Tags
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {image.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
