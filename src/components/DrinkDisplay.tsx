import { DrinkType, DrinkSize } from '@/types/caffeine';

interface DrinkDisplayProps {
  drink: DrinkType;
  size: DrinkSize;
  quantity: number;
}

export function DrinkDisplay({ drink, size, quantity }: DrinkDisplayProps) {
  const getImageSize = () => {
    switch (size.id) {
      case 'small':
        return 'w-32 h-32';
      case 'medium':
        return 'w-40 h-40';
      case 'large':
        return 'w-48 h-48';
      case 'extra-large':
        return 'w-56 h-56';
      default:
        return 'w-40 h-40';
    }
  };

  const imageSize = getImageSize();

  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex gap-4 flex-wrap justify-center">
        {Array.from({ length: quantity }, (_, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={drink.image}
              alt={drink.name}
              className={`${imageSize} object-contain transition-all duration-300`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}