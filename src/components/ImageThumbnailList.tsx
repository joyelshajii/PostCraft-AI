import { X, Image as ImageIcon } from 'lucide-react';
import type { UploadedImage } from '../types';

interface ImageThumbnailListProps {
  images: UploadedImage[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export const ImageThumbnailList = ({
  images,
  onRemove,
  onClearAll,
}: ImageThumbnailListProps) => {
  if (images.length === 0) return null;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <span className="flex items-center gap-1.5 font-medium text-neutral-300">
          <ImageIcon className="w-3.5 h-3.5 text-violet-400" />
          <span>Attached Media ({images.length})</span>
        </span>
        <button
          type="button"
          onClick={onClearAll}
          className="text-[11px] text-neutral-500 hover:text-rose-400 transition-colors"
        >
          Remove all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative flex items-center gap-2.5 p-2 rounded-xl bg-[#0B0C10] border border-[#262936] hover:border-neutral-700 transition-all"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-neutral-800">
              <img
                src={img.previewUrl}
                alt={img.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-neutral-200 truncate" title={img.name}>
                {img.name}
              </p>
              <p className="text-[10px] text-neutral-500 mt-0.5">
                {img.formattedSize}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onRemove(img.id)}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
              aria-label={`Remove image ${img.name}`}
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
