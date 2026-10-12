import { Sparkles, Loader2, ShieldCheck, HelpCircle } from 'lucide-react';
import type { Tone, PostLength, UploadedImage } from '../types';
import { ImageDropzone } from './ImageDropzone';
import { ImageThumbnailList } from './ImageThumbnailList';
import { ToneSelector } from './ToneSelector';
import { LengthSelector } from './LengthSelector';

interface EditorPanelProps {
  contextText: string;
  onContextChange: (text: string) => void;
  tone: Tone;
  onToneChange: (tone: Tone) => void;
  length: PostLength;
  onLengthChange: (len: PostLength) => void;
  images: UploadedImage[];
  onImagesAdded: (images: UploadedImage[]) => void;
  onImageRemove: (id: string) => void;
  onClearAllImages: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onAddErrorToast: (msg: string) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  contextText,
  onContextChange,
  tone,
  onToneChange,
  length,
  onLengthChange,
  images,
  onImagesAdded,
  onImageRemove,
  onClearAllImages,
  onGenerate,
  isGenerating,
  onAddErrorToast,
}) => {
  const characterCount = contextText.length;

  return (
    <section
      aria-label="Post Creation Editor"
      className="bg-[#12141B] border border-[#262936] rounded-2xl p-5 sm:p-7 flex flex-col gap-6 shadow-xl relative"
    >
      {/* Panel Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          What are you sharing today?
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Start with a few words, or drop in your visuals. We'll help you tell the story.
        </p>
      </div>

      {/* Context Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="post-context-input"
            className="block text-xs font-semibold uppercase tracking-wider text-neutral-400"
          >
            Context & Rough Notes
          </label>
          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
            <span>{characterCount} chars</span>
            {characterCount > 0 && (
              <button
                type="button"
                onClick={() => onContextChange('')}
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
                title="Clear input"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <textarea
            id="post-context-input"
            rows={5}
            value={contextText}
            onChange={(e) => onContextChange(e.target.value)}
            placeholder="Just completed my first hackathon, built a prototype with my team, and learned a lot about..."
            className="w-full px-4 py-3.5 rounded-xl bg-[#0B0C10] border border-[#262936] text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-y leading-relaxed font-sans"
          />
        </div>
        <p className="text-[11px] text-neutral-500 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-neutral-500 inline shrink-0" />
          <span>Updates live preview as you type or click Generate for polished framing.</span>
        </p>
      </div>

      {/* Visual Assets / Image Upload */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Visual Assets
          </label>
          <span className="text-[11px] text-neutral-500">
            {images.length > 0 ? `${images.length} selected` : 'Optional'}
          </span>
        </div>

        <ImageDropzone
          onImagesAdded={onImagesAdded}
          onError={onAddErrorToast}
        />

        <ImageThumbnailList
          images={images}
          onRemove={onImageRemove}
          onClearAll={onClearAllImages}
        />
      </div>

      {/* Tone Selection */}
      <ToneSelector
        selectedTone={tone}
        onSelectTone={onToneChange}
      />

      {/* Length Selection */}
      <LengthSelector
        selectedLength={length}
        onSelectLength={onLengthChange}
      />

      {/* Action Area: Generate Post Button */}
      <div className="pt-2 flex flex-col gap-3">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full py-3.5 px-6 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-violet-600 via-violet-600 to-indigo-600 hover:from-violet-500 hover:via-violet-500 hover:to-indigo-500 active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/30 border border-violet-400/20 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Crafting post draft...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-violet-200 group-hover:rotate-12 transition-transform duration-200" />
              <span className="font-semibold tracking-wide">Generate post</span>
            </>
          )}
        </button>

        {/* Demo Notice & Privacy Tag */}
        <div className="flex items-start gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B0C10]/80 border border-[#262936] text-[11px] text-neutral-400 leading-snug">
          <ShieldCheck className="w-4 h-4 text-emerald-400/90 shrink-0 mt-0.5" />
          <div>
            <span className="font-medium text-neutral-300">Local Studio Demo:</span>{' '}
            Draft generator runs locally with built-in templates. Your files and text stay in your browser and are never uploaded to any remote server or external AI.
          </div>
        </div>
      </div>
    </section>
  );
};
