import { useState } from 'react';
import type { FormEvent } from 'react';
import { X, User, Sparkles } from 'lucide-react';
import type { AuthorProfile } from '../types';

interface AuthorSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AuthorProfile;
  onSave: (updated: AuthorProfile) => void;
}

export const AuthorSettingsModal: React.FC<AuthorSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [headline, setHeadline] = useState(profile.headline);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      ...profile,
      name: name.trim() || 'Your Name',
      headline: headline.trim() || 'Computer Science Student',
    });
    onClose();
  };

  const handleUsePreset = (presetName: string, presetHeadline: string) => {
    setName(presetName);
    setHeadline(presetHeadline);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="author-modal-title"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-[#262936] bg-[#12141B] p-6 shadow-2xl text-neutral-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#262936]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-violet-400" />
            <h2 id="author-modal-title" className="text-base font-semibold text-white">
              Preview Author Profile
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
          Customize the fictional author information displayed in the live LinkedIn post card.
        </p>

        {/* Quick presets */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleUsePreset('Alex Morgan', 'Computer Science Student & Full-Stack Builder')}
            className="text-[11px] px-2.5 py-1 rounded-md bg-[#161922] border border-[#262936] hover:border-violet-500/50 text-neutral-300 transition-colors"
          >
            CS Student
          </button>
          <button
            type="button"
            onClick={() => handleUsePreset('Jordan Lee', 'Frontend Engineer @ Startup | Open Source Contributor')}
            className="text-[11px] px-2.5 py-1 rounded-md bg-[#161922] border border-[#262936] hover:border-violet-500/50 text-neutral-300 transition-colors"
          >
            Software Engineer
          </button>
          <button
            type="button"
            onClick={() => handleUsePreset('Your Name', 'Product Designer & Builder')}
            className="text-[11px] px-2.5 py-1 rounded-md bg-[#161922] border border-[#262936] hover:border-violet-500/50 text-neutral-300 transition-colors"
          >
            Your Name
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="author-name" className="block text-xs font-medium text-neutral-300 mb-1.5">
              Full Name
            </label>
            <input
              id="author-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full px-3.5 py-2 rounded-xl bg-[#0B0C10] border border-[#262936] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="author-headline" className="block text-xs font-medium text-neutral-300 mb-1.5">
              Headline / Title
            </label>
            <input
              id="author-headline"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Computer Science Student | AJCE"
              className="w-full px-3.5 py-2 rounded-xl bg-[#0B0C10] border border-[#262936] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
              required
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#262936]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white shadow-sm shadow-violet-900/40 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
