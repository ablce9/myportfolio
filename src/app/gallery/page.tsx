import Link from "next/link";
import Image from "next/image";
import { getImages } from "@/lib/content";

export default function GalleryPage() {
  const images = getImages();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.length > 0 ? (
          images.map((img) => (
            <Link
              key={img.slug}
              href={`/gallery/${img.slug}`}
              className="group block relative rounded-lg overflow-hidden"
            >
              <Image
                src={img.image}
                alt={img.title}
                width={400}
                height={400}
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
          <p className="text-gray-500 col-span-4">
            No images yet. Add some to content/images/
          </p>
        )}
      </div>
    </div>
  );
}
