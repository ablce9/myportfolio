"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  src: string;
  alt: string;
  fullResolutionSrc: string;
}

export default function ImageLightbox({
  src,
  alt,
  fullResolutionSrc,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsZoomed(false);
  }, []);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          handleClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isZoomed, handleClose]);

  return (
    <>
      {/* Clickable Image */}
      <div
        className="relative cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={800}
          height={800}
          className="w-full h-auto rounded-lg"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm bg-black/50 px-3 py-1 rounded">
            Click to view full resolution
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 bg-black/90 ${
            isZoomed ? "overflow-auto" : "flex items-center justify-center"
          }`}
          onClick={isZoomed ? undefined : handleClose}
        >
          {/* Close button */}
          <button
            className="fixed top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-20"
            onClick={handleClose}
          >
            ×
          </button>

          {/* Zoom indicator */}
          <button
            className="fixed top-4 left-4 text-white text-sm bg-black/50 px-3 py-2 rounded hover:bg-black/70 transition-colors z-20"
            onClick={toggleZoom}
          >
            {isZoomed ? "🔍 Fit to screen" : "🔍 View full size"}
          </button>

          {/* Full resolution image */}
          <div
            className={`${isZoomed ? "p-4" : "relative max-w-full max-h-full p-4"}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom();
            }}
          >
            <img
              src={fullResolutionSrc}
              alt={alt}
              className={`${
                isZoomed
                  ? "max-w-none cursor-zoom-out"
                  : "max-w-full max-h-[90vh] object-contain cursor-zoom-in"
              }`}
            />
          </div>

          {/* Instructions */}
          <p className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm z-20">
            {isZoomed
              ? "Click image to fit • Scroll to pan • ESC to close"
              : "Click image to magnify • ESC to close"}
          </p>
        </div>
      )}
    </>
  );
}
