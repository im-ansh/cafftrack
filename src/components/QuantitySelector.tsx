import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, onQuantityChange }: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < 10) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={handleDecrease} 
        className="control-button"
        disabled={quantity <= 1}
      >
        <Minus size={20} />
      </button>
      
      <div className="text-4xl font-black text-center min-w-[60px]">
        {quantity}
      </div>
      
      <button 
        onClick={handleIncrease} 
        className="control-button"
        disabled={quantity >= 10}
      >
        <Plus size={20} />
      </button>
    </div>
  );
}