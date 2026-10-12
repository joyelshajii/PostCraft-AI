import { SlidersHorizontal, Sparkles, Eye, PenLine, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  onReset: () => void;
  activeMobileTab: 'compose' | 'preview';
  onMobileTabChange: (tab: 'compose' | 'preview') => void;
  imageCount: number;
}

export const Header = ({
  onOpenSettings,
  onReset,
  activeMobileTab,
  onMobileTabChange,
  imageCount,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#262936] bg-[#0B0C10]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-md shadow-violet-900/20 text-white shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-base font-semibold tracking-tight text-neutral-100">
              PostCraft <span className="text-violet-400">AI</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider text-violet-300 uppercase px-2 py-0.5 rounded-full bg-violet-950/60 border border-violet-800/40">
              LinkedIn Post Studio
            </span>
          </div>
        </div>

        {/* Studio utility actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#262936] bg-[#12141B] text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 text-xs font-medium transition-colors cursor-pointer"
            title="Reset to default example"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#262936] bg-[#12141B] text-neutral-300 hover:text-white hover:border-[#8B5CF6]/50 text-xs font-medium transition-all group cursor-pointer"
            title="Customize author preview"
            aria-label="Profile and preview settings"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 group-hover:text-violet-400 transition-colors" />
            <span className="hidden sm:inline">Author Profile</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden border-t border-[#262936]/60 bg-[#0E1017] px-4 py-2">
        <div className="max-w-md mx-auto grid grid-cols-2 p-1 bg-[#0B0C10] border border-[#262936] rounded-xl text-xs">
          <button
            type="button"
            onClick={() => onMobileTabChange('compose')}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              activeMobileTab === 'compose'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Compose</span>
          </button>

          <button
            type="button"
            onClick={() => onMobileTabChange('preview')}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              activeMobileTab === 'preview'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
            {imageCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-violet-900/90 text-[10px] text-violet-200 border border-violet-700/50">
                {imageCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
