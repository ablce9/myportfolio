import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface ImageData {
  slug: string;
  title: string;
  image: string;
  thumbnail?: string;
  originalImage?: string;
  description?: string;
  tags?: string[];
  location?: string;
  capturedAt?: string;
  featured?: boolean;
  publishedAt: string;
}

export interface StoryData {
  slug: string;
  title: string;
  coverImage: string;
  relatedImages?: string[];
  publishedAt: string;
  content: string;
}

export function getImages(): ImageData[] {
  const imagesDir = path.join(contentDirectory, "images");

  if (!fs.existsSync(imagesDir)) {
    return [];
  }

  const files = fs.readdirSync(imagesDir).filter((f) => f.endsWith(".md"));

  const images = files
    .map((filename) => {
      const filePath = path.join(imagesDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: data.slug || filename.replace(".md", ""),
        title: data.title,
        image: data.image,
        thumbnail: data.thumbnail,
        originalImage: data.originalImage,
        description: data.description,
        tags: data.tags,
        location: data.location,
        capturedAt: data.capturedAt,
        featured: data.featured,
        publishedAt: data.publishedAt,
      } as ImageData;
    })
    .filter((img) => img.title && img.image);

  return images.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getImageBySlug(slug: string): ImageData | null {
  const images = getImages();
  return images.find((img) => img.slug === slug) || null;
}

export function getFeaturedImages(): ImageData[] {
  return getImages().filter((img) => img.featured);
}

export function getStories(): StoryData[] {
  const storiesDir = path.join(contentDirectory, "stories");

  if (!fs.existsSync(storiesDir)) {
    return [];
  }

  const files = fs.readdirSync(storiesDir).filter((f) => f.endsWith(".md"));

  const stories = files
    .map((filename) => {
      const filePath = path.join(storiesDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || filename.replace(".md", ""),
        title: data.title,
        coverImage: data.coverImage,
        relatedImages: data.relatedImages,
        publishedAt: data.publishedAt,
        content,
      } as StoryData;
    })
    .filter((story) => story.title);

  return stories.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getStoryBySlug(slug: string): StoryData | null {
  const stories = getStories();
  return stories.find((story) => story.slug === slug) || null;
}

// Get full resolution URL
// If originalImage is provided (from Flickr embed code), use it
// Otherwise fall back to _b (1024px)
export function getFullResolutionUrl(
  imageUrl: string,
  originalImage?: string
): string {
  if (originalImage) {
    return originalImage;
  }
  // Fallback to _b (1024px) which is the largest commonly available
  return imageUrl.replace(/_[a-z]\.jpg$/i, "_b.jpg");
}
