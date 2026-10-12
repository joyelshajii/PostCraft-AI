import type { ComponentType } from 'react';
import { Briefcase, Heart, Terminal, BookOpen } from 'lucide-react';
import type { Tone } from '../types';

interface ToneSelectorProps {
  selectedTone: Tone;
  onSelectTone: (tone: Tone) => void;
}

interface ToneOption {
  value: Tone;
  label: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
}

const TONES: ToneOption[] = [
  {
    value: 'Professional',
    label: 'Professional',
    desc: 'Polished, authoritative & industry-focused',
    icon: Briefcase,
  },
  {
    value: 'Personal',
    label: 'Personal',
    desc: 'Authentic, relatable & honest journey',
    icon: Heart,
  },
  {
    value: 'Technical',
    label: 'Technical',
    desc: 'Architecture, engineering metrics & lessons',
    icon: Terminal,
  },
  {
    value: 'Storytelling',
    label: 'Storytelling',
    desc: 'Engaging narrative, tension & resolution',
    icon: BookOpen,
  },
];

export const ToneSelector = ({
  selectedTone,
  onSelectTone,
}: ToneSelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Tone of Voice
        </label>
        <span className="text-[11px] text-violet-400 font-medium">
          {selectedTone}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {TONES.map((t) => {
          const isSelected = selectedTone === t.value;
          const Icon = t.icon;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => onSelectTone(t.value)}
              className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-violet-950/30 border-violet-500/80 text-white shadow-sm shadow-violet-950/40 ring-1 ring-violet-500/50'
                  : 'bg-[#0B0C10] border-[#262936] text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 hover:bg-[#14161F]'
              }`}
            >
              <div className="flex items-center gap-2 w-full">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-violet-400' : 'text-neutral-400'
                  }`}
                />
                <span className="text-xs font-semibold text-neutral-100">
                  {t.label}
                </span>
              </div>
              <span className="mt-1.5 text-[11px] text-neutral-400 line-clamp-1 leading-snug">
                {t.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
