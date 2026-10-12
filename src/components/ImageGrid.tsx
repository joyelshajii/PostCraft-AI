import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import type { UploadedImage } from '../types';

interface ImageGridProps {
  images: UploadedImage[];
}

export const ImageGrid = ({ images }: ImageGridProps) => {
  const [activeModalImg, setActiveModalImg] = useState<UploadedImage | null>(null);

  if (!images || images.length === 0) return null;

  const count = images.length;

  return (
    <div className="w-full mt-3 rounded-xl overflow-hidden border border-[#262936] bg-[#0B0C10]">
      {/* 1 Image: Full Width View */}
      {count === 1 && (
        <div
          onClick={() => setActiveModalImg(images[0])}
          className="relative group cursor-pointer overflow-hidden max-h-[380px] flex items-center justify-center bg-black/40"
        >
          <img
            src={images[0].previewUrl}
            alt={images[0].name}
            className="w-full h-auto max-h-[380px] object-cover group-hover:scale-[1.01] transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="p-2 rounded-full bg-black/60 text-white backdrop-blur-sm">
              <ZoomIn className="w-4 h-4" />
            </span>
          </div>
        </div>
      )}

      {/* 2 Images: 50 / 50 Split */}
      {count === 2 && (
        <div className="grid grid-cols-2 gap-1 h-64 sm:h-72">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveModalImg(img)}
              className="relative group cursor-pointer overflow-hidden bg-black/40 h-full"
            >
              <img
                src={img.previewUrl}
                alt={img.name}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-1.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
                  <ZoomIn className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3 Images: 1 large on left, 2 stacked on right */}
      {count === 3 && (
        <div className="grid grid-cols-2 gap-1 h-72 sm:h-80">
          <div
            onClick={() => setActiveModalImg(images[0])}
            className="relative group cursor-pointer overflow-hidden bg-black/40 h-full"
          >
            <img
              src={images[0].previewUrl}
              alt={images[0].name}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-1.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
                <ZoomIn className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-1 h-full">
            {images.slice(1, 3).map((img) => (
              <div
                key={img.id}
                onClick={() => setActiveModalImg(img)}
                className="relative group cursor-pointer overflow-hidden bg-black/40 h-full"
              >
                <img
                  src={img.previewUrl}
                  alt={img.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
                    <ZoomIn className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4 or more Images: 2x2 Grid with +N overlay if more than 4 */}
      {count >= 4 && (
        <div className="grid grid-cols-2 grid-rows-2 gap-1 h-72 sm:h-80">
          {images.slice(0, 4).map((img, idx) => {
            const isLast = idx === 3;
            const remaining = count - 4;

            return (
              <div
                key={img.id}
                onClick={() => setActiveModalImg(img)}
                className="relative group cursor-pointer overflow-hidden bg-black/40 h-full"
              >
                <img
                  src={img.previewUrl}
                  alt={img.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                />

                {isLast && remaining > 0 ? (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white font-semibold">
                    <span className="text-2xl sm:text-3xl">+{remaining}</span>
                    <span className="text-[10px] text-neutral-300 tracking-wider uppercase mt-0.5">
                      More photos
                    </span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
                      <ZoomIn className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeModalImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in"
          onClick={() => setActiveModalImg(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalImg(null)}
              className="absolute -top-10 right-0 text-neutral-400 hover:text-white p-1 rounded-lg"
              aria-label="Close enlarged image"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeModalImg.previewUrl}
              alt={activeModalImg.name}
              className="max-w-full max-h-[82vh] rounded-lg object-contain shadow-2xl"
            />
            <p className="mt-2 text-xs text-neutral-400 font-medium">
              {activeModalImg.name} ({activeModalImg.formattedSize})
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
