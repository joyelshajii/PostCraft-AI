import type { PostLength } from '../types';

interface LengthSelectorProps {
  selectedLength: PostLength;
  onSelectLength: (len: PostLength) => void;
}

interface LengthOption {
  value: PostLength;
  label: string;
  detail: string;
}

const LENGTHS: LengthOption[] = [
  { value: 'Concise', label: 'Concise', detail: '~1-2 min read • High punch' },
  { value: 'Balanced', label: 'Balanced', detail: '~3 min read • Standard LinkedIn' },
  { value: 'Detailed', label: 'Detailed', detail: '~4-5 min read • Deep dive' },
];

export const LengthSelector = ({
  selectedLength,
  onSelectLength,
}: LengthSelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Post Length
        </label>
        <span className="text-[11px] text-violet-400 font-medium">
          {selectedLength}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-[#0B0C10] border border-[#262936]">
        {LENGTHS.map((len) => {
          const isSelected = selectedLength === len.value;
          return (
            <button
              key={len.value}
              type="button"
              onClick={() => onSelectLength(len.value)}
              className={`py-2 px-3 rounded-lg text-center transition-all duration-150 ${
                isSelected
                  ? 'bg-violet-950/50 border border-violet-500/70 text-white shadow-sm font-medium'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#161922] font-normal border border-transparent'
              }`}
            >
              <div className="text-xs font-medium">{len.label}</div>
              <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                {len.detail.split('•')[0]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
