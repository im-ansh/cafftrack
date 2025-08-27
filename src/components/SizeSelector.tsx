import { DRINK_SIZES } from '@/data/drinks';
import { DrinkSize } from '@/types/caffeine';

interface SizeSelectorProps {
  selectedSize: DrinkSize;
  onSizeChange: (size: DrinkSize) => void;
}

export function SizeSelector({ selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {DRINK_SIZES.map((size) => (
        <button
          key={size.id}
          onClick={() => onSizeChange(size)}
          className={`size-button ${selectedSize.id === size.id ? 'active' : ''}`}
        >
          <div className="text-sm font-black">{size.name}</div>
          <div className="text-xs opacity-80">{size.volume} ml</div>
        </button>
      ))}
    </div>
  );
}