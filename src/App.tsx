import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { EditorPanel } from './components/EditorPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { AuthorSettingsModal } from './components/AuthorSettingsModal';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import type { Tone, PostLength, UploadedImage, AuthorProfile } from './types';
import {
  generatePost,
  SAMPLE_INITIAL_CONTEXT,
} from './utils/generator';
import heroImg from './assets/hero.png';

export function App() {
  // Tone & Length
  const [tone, setTone] = useState<Tone>('Storytelling');
  const [length, setLength] = useState<PostLength>('Balanced');
  const [variantIndex, setVariantIndex] = useState<number>(0);

  // Input Context
  const [contextText, setContextText] = useState<string>(SAMPLE_INITIAL_CONTEXT);

  // Author Profile
  const [author, setAuthor] = useState<AuthorProfile>({
    name: 'Alex Morgan',
    headline: 'Computer Science Student & Full-Stack Builder',
    avatarUrl: '',
  });

  // Attached Images
  const [images, setImages] = useState<UploadedImage[]>([
    {
      id: 'initial-sample-image',
      file: new File([], 'hackathon-team-prototype.png', { type: 'image/png' }),
      previewUrl: heroImg,
      name: 'hackathon-team-prototype.png',
      size: 13057,
      formattedSize: '12.8 KB',
    },
  ]);

  // Initial generated state
  const initialGenerated = generatePost(SAMPLE_INITIAL_CONTEXT, 'Storytelling', 'Balanced', true, 0);

  // Generated Post Text and Hashtags
  const [postText, setPostText] = useState<string>(initialGenerated.text);
  const [hashtags, setHashtags] = useState<string[]>(initialGenerated.hashtags);

  // UI States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState<boolean>(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'compose' | 'preview'>('compose');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helper
  const addToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Internal function to update generated text
  const applyGeneration = useCallback(
    (
      text: string,
      currentTone: Tone,
      currentLength: PostLength,
      currentImages: UploadedImage[],
      currentVariant: number
    ) => {
      const generated = generatePost(
        text,
        currentTone,
        currentLength,
        currentImages.length > 0,
        currentVariant
      );
      setPostText(generated.text);
      setHashtags(generated.hashtags);
    },
    []
  );

  // Live update preview when typing in context box
  const handleContextChange = (newContext: string) => {
    setContextText(newContext);
    applyGeneration(newContext, tone, length, images, variantIndex);
  };

  // Tone change updates preview and status
  const handleToneChange = (newTone: Tone) => {
    setTone(newTone);
    applyGeneration(contextText, newTone, length, images, variantIndex);
    addToast(`Tone adjusted to ${newTone}`, 'info');
  };

  // Length change updates preview and status
  const handleLengthChange = (newLength: PostLength) => {
    setLength(newLength);
    applyGeneration(contextText, tone, newLength, images, variantIndex);
    addToast(`Length format set to ${newLength}`, 'info');
  };

  // Add images
  const handleImagesAdded = (newImages: UploadedImage[]) => {
    setImages((prev) => [...prev, ...newImages]);
    addToast(`Added ${newImages.length} image(s)`, 'success');
  };

  // Remove image
  const handleImageRemove = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target && target.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((img) => img.id !== id);
    });
    addToast('Image removed', 'info');
  };

  // Clear all images
  const handleClearAllImages = () => {
    images.forEach((img) => {
      if (img.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(img.previewUrl);
      }
    });
    setImages([]);
    addToast('Cleared all images', 'info');
  };

  // Generate Post action (simulated 320ms polish)
  const handleGenerate = () => {
    if (!contextText.trim()) {
      addToast('Please enter a few words in the context box first.', 'error');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      applyGeneration(contextText, tone, length, images, variantIndex);
      setIsGenerating(false);
      addToast('Polished draft generated!', 'success');
      // If on mobile, switch to preview tab so user sees the result immediately
      if (window.innerWidth < 1024) {
        setActiveMobileTab('preview');
      }
    }, 320);
  };

  // Regenerate alternate local version
  const handleRegenerate = () => {
    setIsGenerating(true);
    const nextVariant = variantIndex + 1;
    setVariantIndex(nextVariant);

    setTimeout(() => {
      applyGeneration(contextText, tone, length, images, nextVariant);
      setIsGenerating(false);
      addToast('Regenerated alternate phrasing', 'info');
    }, 280);
  };

  // Copy Post
  const handleCopyPost = async () => {
    const fullContent = `${postText}\n\n${hashtags.join(' ')}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullContent);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = fullContent;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
      addToast('Post and hashtags copied to clipboard!', 'success');
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      addToast('Failed to copy to clipboard', 'error');
    }
  };

  // Hashtag management
  const handleAddHashtag = (tag: string) => {
    if (!hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
      addToast(`Added hashtag ${tag}`, 'success');
    }
  };

  const handleRemoveHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((t) => t !== tagToRemove));
  };

  // Reset to initial demo sample
  const handleReset = () => {
    setTone('Storytelling');
    setLength('Balanced');
    setVariantIndex(0);
    setContextText(SAMPLE_INITIAL_CONTEXT);
    setImages([
      {
        id: 'sample-hero-reset',
        file: new File([], 'hackathon-team-prototype.png', { type: 'image/png' }),
        previewUrl: heroImg,
        name: 'hackathon-team-prototype.png',
        size: 13057,
        formattedSize: '12.8 KB',
      },
    ]);
    applyGeneration(SAMPLE_INITIAL_CONTEXT, 'Storytelling', 'Balanced', [
      {
        id: 'sample-hero-reset',
        file: new File([], 'hackathon-team-prototype.png', { type: 'image/png' }),
        previewUrl: heroImg,
        name: 'hackathon-team-prototype.png',
        size: 13057,
        formattedSize: '12.8 KB',
      },
    ], 0);
    addToast('Reset to initial sample draft', 'info');
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#F3F4F6] flex flex-col selection:bg-violet-500/30 selection:text-white">
      {/* Top Navigation */}
      <Header
        onOpenSettings={() => setIsAuthorModalOpen(true)}
        onReset={handleReset}
        activeMobileTab={activeMobileTab}
        onMobileTabChange={setActiveMobileTab}
        imageCount={images.length}
      />

      {/* Main Split-Screen Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Panel: Post Creation */}
          <div
            className={`lg:col-span-6 xl:col-span-5 ${
              activeMobileTab === 'compose' ? 'block' : 'hidden lg:block'
            }`}
          >
            <EditorPanel
              contextText={contextText}
              onContextChange={handleContextChange}
              tone={tone}
              onToneChange={handleToneChange}
              length={length}
              onLengthChange={handleLengthChange}
              images={images}
              onImagesAdded={handleImagesAdded}
              onImageRemove={handleImageRemove}
              onClearAllImages={handleClearAllImages}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              onAddErrorToast={(msg) => addToast(msg, 'error')}
            />
          </div>

          {/* Right Panel: Live LinkedIn Preview */}
          <div
            className={`lg:col-span-6 xl:col-span-7 ${
              activeMobileTab === 'preview' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-20">
              <PreviewPanel
                postText={postText}
                onPostTextChange={setPostText}
                hashtags={hashtags}
                onAddHashtag={handleAddHashtag}
                onRemoveHashtag={handleRemoveHashtag}
                images={images}
                tone={tone}
                length={length}
                author={author}
                onOpenAuthorSettings={() => setIsAuthorModalOpen(true)}
                onRegenerate={handleRegenerate}
                isGenerating={isGenerating}
                onCopyPost={handleCopyPost}
                isCopied={isCopied}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Author Profile Settings Modal */}
      <AuthorSettingsModal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
        profile={author}
        onSave={(updated) => {
          setAuthor(updated);
          addToast('Author profile updated', 'success');
        }}
      />

      {/* Toasts */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
