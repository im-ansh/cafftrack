import { DRINK_TYPES } from '@/data/drinks';
import { DrinkType } from '@/types/caffeine';

interface DrinkSelectorProps {
  selectedDrink: DrinkType;
  onDrinkChange: (drink: DrinkType) => void;
}

export function DrinkSelector({ selectedDrink, onDrinkChange }: DrinkSelectorProps) {
  return (
    <div className="space-y-3">
      {DRINK_TYPES.map((drink) => (
        <button
          key={drink.id}
          onClick={() => onDrinkChange(drink)}
          className={`drink-selector ${selectedDrink.id === drink.id ? 'active' : ''}`}
        >
          {drink.name}
        </button>
      ))}
    </div>
  );
}