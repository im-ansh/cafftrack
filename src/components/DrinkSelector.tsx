import { DRINK_TYPES } from '@/data/drinks';
import { DrinkType } from '@/types/caffeine';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DrinkSelectorProps {
  selectedDrink: DrinkType;
  onDrinkChange: (drink: DrinkType) => void;
}

export function DrinkSelector({ selectedDrink, onDrinkChange }: DrinkSelectorProps) {
  const currentIndex = DRINK_TYPES.findIndex(drink => drink.id === selectedDrink.id);
  
  const handlePrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : DRINK_TYPES.length - 1;
    onDrinkChange(DRINK_TYPES[prevIndex]);
  };
  
  const handleNext = () => {
    const nextIndex = currentIndex < DRINK_TYPES.length - 1 ? currentIndex + 1 : 0;
    onDrinkChange(DRINK_TYPES[nextIndex]);
  };

  return (
    <div className="flex items-center justify-center gap-6">
      <button 
        onClick={handlePrevious}
        className="control-button"
        aria-label="Previous drink"
      >
        <ChevronLeft size={24} />
      </button>
      
      <div className="text-center min-w-[160px]">
        <div className="text-xl font-black text-foreground">
          {selectedDrink.name}
        </div>
      </div>
      
      <button 
        onClick={handleNext}
        className="control-button"
        aria-label="Next drink"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}