import { useRef, useState } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { ImagePlus, Upload } from 'lucide-react';
import type { UploadedImage } from '../types';
import { formatFileSize } from '../utils/generator';

interface ImageDropzoneProps {
  onImagesAdded: (images: UploadedImage[]) => void;
  onError: (msg: string) => void;
}

export const ImageDropzone = ({
  onImagesAdded,
  onError,
}: ImageDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const validImages: UploadedImage[] = [];
    const invalidNames: string[] = [];

    Array.from(fileList).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        validImages.push({
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          file,
          previewUrl,
          name: file.name,
          size: file.size,
          formattedSize: formatFileSize(file.size),
        });
      } else {
        invalidNames.push(file.name);
      }
    });

    if (invalidNames.length > 0) {
      onError(`Skipped ${invalidNames.length} non-image file(s): ${invalidNames.join(', ')}`);
    }

    if (validImages.length > 0) {
      onImagesAdded(validImages);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Reset file input value so selecting the same file again triggers change
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        onChange={handleChange}
        className="hidden"
        id="image-file-input"
        aria-label="Upload post images"
      />

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        className={`relative group cursor-pointer w-full rounded-2xl border-2 border-dashed p-6 transition-all duration-200 text-center flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
          isDragging
            ? 'border-violet-500 bg-violet-950/20 shadow-inner'
            : 'border-[#262936] hover:border-violet-500/50 bg-[#0B0C10]/60 hover:bg-[#12141B]'
        }`}
      >
        <div className="w-10 h-10 rounded-xl bg-[#161922] border border-[#262936] flex items-center justify-center text-neutral-400 group-hover:text-violet-400 group-hover:border-violet-500/40 transition-colors mb-3">
          {isDragging ? (
            <Upload className="w-5 h-5 text-violet-400 animate-bounce" />
          ) : (
            <ImagePlus className="w-5 h-5" />
          )}
        </div>

        <div className="text-xs font-medium text-neutral-200">
          <span className="text-violet-400 underline decoration-violet-500/40 underline-offset-4 group-hover:text-violet-300">
            Click to upload
          </span>{' '}
          or drag and drop
        </div>

        <p className="mt-1 text-[11px] text-neutral-500">
          Select multiple visual assets (PNG, JPG, WebP, GIF)
        </p>
      </div>
    </div>
  );
};
