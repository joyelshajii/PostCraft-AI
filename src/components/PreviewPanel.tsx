import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Copy,
  Check,
  RotateCw,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  MoreHorizontal,
  Globe,
  SlidersHorizontal,
  Edit3,
  Sparkles,
} from 'lucide-react';
import type { Tone, PostLength, UploadedImage, AuthorProfile } from '../types';
import { ImageGrid } from './ImageGrid';

interface PreviewPanelProps {
  postText: string;
  onPostTextChange: (text: string) => void;
  hashtags: string[];
  onAddHashtag: (tag: string) => void;
  onRemoveHashtag: (tag: string) => void;
  images: UploadedImage[];
  tone: Tone;
  length: PostLength;
  author: AuthorProfile;
  onOpenAuthorSettings: () => void;
  onRegenerate: () => void;
  isGenerating: boolean;
  onCopyPost: () => void;
  isCopied: boolean;
}

export const PreviewPanel = ({
  postText,
  onPostTextChange,
  hashtags,
  onAddHashtag,
  onRemoveHashtag,
  images,
  tone,
  length,
  author,
  onOpenAuthorSettings,
  onRegenerate,
  isGenerating,
  onCopyPost,
  isCopied,
}: PreviewPanelProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [newTagInput, setNewTagInput] = useState('');
  const [showAddTag, setShowAddTag] = useState(false);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleAddTagSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    let tag = newTagInput.trim();
    if (!tag.startsWith('#')) {
      tag = `#${tag}`;
    }
    // Clean up spaces
    tag = tag.replace(/\s+/g, '');
    onAddHashtag(tag);
    setNewTagInput('');
    setShowAddTag(false);
  };

  const totalLength = postText.length;
  const wordCount = postText.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <section
      aria-label="Live LinkedIn Post Preview"
      className="bg-[#12141B] border border-[#262936] rounded-2xl p-5 sm:p-7 flex flex-col gap-5 shadow-xl"
    >
      {/* Top Header & Actions Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#262936]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Post Preview
            </h2>
            <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full bg-blue-950/40 text-blue-400 border border-blue-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              LinkedIn Style
            </span>
          </div>
          {/* Subtle Tone & Length hint */}
          <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400">
            <span>
              Tone: <strong className="text-violet-300 font-medium">{tone}</strong>
            </span>
            <span className="text-neutral-600">•</span>
            <span>
              Length: <strong className="text-neutral-200 font-medium">{length}</strong>
            </span>
            <span className="text-neutral-600">•</span>
            <span>{totalLength} chars (~{readingTime}m read)</span>
          </div>
        </div>

        {/* Action Controls: Regenerate & Copy Post */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#262936] bg-[#0B0C10] text-neutral-300 hover:text-white hover:border-violet-500/50 text-xs font-medium transition-all group disabled:opacity-50 cursor-pointer"
            title="Generate an alternate phrasing"
          >
            <RotateCw
              className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-violet-400 transition-colors ${
                isGenerating ? 'animate-spin text-violet-400' : ''
              }`}
            />
            <span>Regenerate</span>
          </button>

          <button
            type="button"
            onClick={onCopyPost}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer ${
              isCopied
                ? 'bg-emerald-600 text-white shadow-emerald-950/40'
                : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-950/40'
            }`}
            title="Copy post and hashtags to clipboard"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-violet-200" />
                <span>Copy post</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Realistic LinkedIn Post Card */}
      <article
        className="rounded-2xl border border-[#262936] bg-[#0E1017] p-4 sm:p-5 shadow-2xl relative transition-all"
        aria-label="Simulated LinkedIn Post"
      >
        {/* Author Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative group/avatar cursor-pointer" onClick={onOpenAuthorSettings} title="Click to edit profile info">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-violet-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold text-base shadow-md border-2 border-neutral-800">
                {author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase() || 'YN'}
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0E1017] rounded-full" title="Active on LinkedIn"></span>
            </div>

            {/* Author Meta */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  onClick={onOpenAuthorSettings}
                  className="font-semibold text-sm sm:text-base text-neutral-100 hover:text-violet-400 hover:underline cursor-pointer truncate"
                  title="Edit author profile"
                >
                  {author.name}
                </span>
                <span className="text-neutral-500 text-xs">• 1st</span>
              </div>
              <p className="text-xs text-neutral-400 truncate max-w-xs sm:max-w-md">
                {author.headline}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-0.5">
                <span>Just now</span>
                <span>•</span>
                <span>Edited</span>
                <span>•</span>
                <Globe className="w-3 h-3 text-neutral-500 inline" />
              </div>
            </div>
          </div>

          {/* Card Top Right Options */}
          <div className="flex items-center gap-1 text-neutral-500">
            <button
              type="button"
              onClick={onOpenAuthorSettings}
              className="p-1.5 rounded-lg hover:text-neutral-300 hover:bg-neutral-800/60 transition-colors"
              title="Edit author"
              aria-label="Edit preview author"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-lg hover:text-neutral-300 hover:bg-neutral-800/60 transition-colors"
              title="Post options"
              aria-label="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editable Post Content Body */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1.5">
            <span className="flex items-center gap-1">
              <Edit3 className="w-3 h-3 text-violet-400" />
              <span>Editable directly in preview:</span>
            </span>
            <span className="text-[10px]">
              {totalLength} / 3,000 characters
            </span>
          </div>

          <textarea
            value={postText}
            onChange={(e) => onPostTextChange(e.target.value)}
            rows={Math.max(6, Math.min(16, postText.split('\n').length + 2))}
            placeholder="Your drafted post will appear here..."
            className="w-full bg-[#08090D] border border-[#262936] rounded-xl p-3.5 text-sm sm:text-base text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 leading-relaxed font-sans transition-all resize-y"
          />
        </div>

        {/* Hashtags Section */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="group inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-950/30 hover:bg-blue-950/60 border border-blue-900/40 px-2 py-0.5 rounded-md transition-colors"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => onRemoveHashtag(tag)}
                className="opacity-60 hover:opacity-100 text-neutral-400 hover:text-rose-400 ml-0.5"
                title={`Remove ${tag}`}
                aria-label={`Remove hashtag ${tag}`}
              >
                ×
              </button>
            </span>
          ))}

          {showAddTag ? (
            <form onSubmit={handleAddTagSubmit} className="inline-flex items-center gap-1">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                placeholder="#tag"
                autoFocus
                className="text-xs px-2 py-0.5 rounded bg-[#08090D] border border-blue-500 text-blue-300 w-24 focus:outline-none"
              />
              <button
                type="submit"
                className="text-[11px] px-2 py-0.5 bg-blue-600 text-white rounded font-medium"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddTag(false)}
                className="text-neutral-500 text-xs px-1 hover:text-neutral-300"
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setShowAddTag(true)}
              className="text-[11px] text-neutral-500 hover:text-blue-400 px-2 py-0.5 rounded border border-dashed border-neutral-700 hover:border-blue-500/50 transition-colors"
            >
              + Add tag
            </button>
          )}
        </div>

        {/* Clean Image Grid Layout */}
        <ImageGrid images={images} />

        {/* Social Reactions Counter Bar */}
        <div className="mt-4 pt-3 flex items-center justify-between text-xs text-neutral-400 border-t border-[#1F222E]">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center -space-x-1">
              <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white">
                👍
              </span>
              <span className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] text-white">
                💡
              </span>
              <span className="w-4 h-4 rounded-full bg-rose-600 flex items-center justify-center text-[10px] text-white">
                ❤️
              </span>
            </span>
            <span className="text-[11px] text-neutral-400 ml-1">
              {likeCount} reactions
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-neutral-400">
            <span>6 comments</span>
            <span>•</span>
            <span>2 reposts</span>
          </div>
        </div>

        {/* LinkedIn-Inspired Action Bar */}
        <div className="mt-2 pt-2 border-t border-[#1F222E] grid grid-cols-4 gap-1">
          <button
            type="button"
            onClick={handleLikeToggle}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
              isLiked
                ? 'text-blue-400 bg-blue-950/20'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#161922]'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-blue-400' : ''}`} />
            <span className="hidden sm:inline">Like</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-neutral-200 hover:bg-[#161922] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Comment</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-neutral-200 hover:bg-[#161922] transition-colors"
          >
            <Repeat2 className="w-4 h-4" />
            <span className="hidden sm:inline">Repost</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-neutral-200 hover:bg-[#161922] transition-colors"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </article>

      {/* Quick Action Footer */}
      <div className="p-3 rounded-xl bg-[#0B0C10] border border-[#262936] flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Ready to share? Copy post to paste into LinkedIn.</span>
        </div>
        <button
          type="button"
          onClick={onCopyPost}
          className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 underline underline-offset-4 decoration-violet-500/40"
        >
          {isCopied ? 'Copied to clipboard' : 'Copy formatted text & tags'}
        </button>
      </div>
    </section>
  );
};
