import { useState } from 'react';
import { History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { DrinkSelector } from '@/components/DrinkSelector';
import { SizeSelector } from '@/components/SizeSelector';
import { QuantitySelector } from '@/components/QuantitySelector';
import { DrinkDisplay } from '@/components/DrinkDisplay';
import { CaffeineTimer } from '@/components/CaffeineTimer';
import { HistoryModal } from '@/components/HistoryModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DRINK_TYPES, DRINK_SIZES } from '@/data/drinks';
import { CaffeineEntry } from '@/types/caffeine';
import { format } from 'date-fns';

const Index = () => {
  // Default to Café Latte as requested
  const [selectedDrink, setSelectedDrink] = useState(DRINK_TYPES.find(d => d.id === 'cafe-latte') || DRINK_TYPES[0]);
  const [selectedSize, setSelectedSize] = useState(DRINK_SIZES[0]); // Small by default
  const [quantity, setQuantity] = useState(1);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  const [caffeineHistory, setCaffeineHistory] = useLocalStorage<Record<string, CaffeineEntry[]>>('caffeine-history', {});
  const [lastCaffeineTime, setLastCaffeineTime] = useLocalStorage<number | undefined>('last-caffeine-time', undefined);

  // Calculate total caffeine
  const totalCaffeine = Math.round(selectedDrink.caffeinePerMl * selectedSize.volume * quantity);

  const logCaffeine = () => {
    const now = Date.now();
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const newEntry: CaffeineEntry = {
      id: `${now}`,
      date: today,
      drinkType: selectedDrink.id,
      size: selectedSize.id,
      quantity,
      totalCaffeine,
      timestamp: now,
    };

    setCaffeineHistory(prev => ({
      ...prev,
      [today]: [...(prev[today] || []), newEntry]
    }));

    setLastCaffeineTime(now);
    
    toast({
      title: "Caffeine Logged!",
      description: `${quantity}x ${selectedDrink.name} (${selectedSize.name}) - ${totalCaffeine}mg caffeine`,
    });
  };

  const getTodayTotal = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayEntries = caffeineHistory[today] || [];
    return todayEntries.reduce((sum, entry) => sum + entry.totalCaffeine, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="text-2xl font-black text-foreground">
          Cafftrack
        </div>
        <div className="text-sm text-muted-foreground">
          {format(new Date(), 'h:mm a')}
        </div>
      </div>

      {/* History Button */}
      <div className="px-4 mb-4">
        <Button
          variant="outline"
          onClick={() => setIsHistoryOpen(true)}
          className="w-full font-bold border-2"
        >
          <History className="mr-2" size={20} />
          View History
        </Button>
      </div>

      {/* Caffeine Timer */}
      <div className="px-4 mb-6">
        <CaffeineTimer lastCaffeineTime={lastCaffeineTime} />
      </div>

      <div className="px-4 space-y-6">
        {/* Drink Display */}
        <DrinkDisplay 
          drink={selectedDrink} 
          size={selectedSize} 
          quantity={quantity} 
        />

        {/* Caffeine Content */}
        <div className="text-center">
          <div className="text-muted-foreground text-lg">Caffeine content</div>
          <div className="text-5xl font-black text-caffeine">{totalCaffeine} <span className="text-2xl">mg</span></div>
        </div>

        {/* Drink Selector */}
        <div className="mb-8">
          <DrinkSelector 
            selectedDrink={selectedDrink} 
            onDrinkChange={setSelectedDrink} 
          />
        </div>

        {/* Size Selector */}
        <div className="mb-8">
          <SizeSelector 
            selectedSize={selectedSize} 
            onSizeChange={setSelectedSize} 
          />
        </div>

        {/* Quantity Selector */}
        <div className="mb-8">
          <div className="flex justify-center">
            <QuantitySelector 
              quantity={quantity} 
              onQuantityChange={setQuantity} 
            />
          </div>
        </div>

        {/* Today's Total */}
        <div className="text-center mb-8">
          <div className="text-muted-foreground text-sm">Today's Total</div>
          <div className="text-2xl font-black text-foreground">{Math.round(getTodayTotal())} mg</div>
        </div>

        {/* Confirm Button */}
        <Button 
          onClick={logCaffeine}
          className="w-full h-14 text-xl font-black rounded-2xl"
        >
          Confirm
        </Button>

        <div className="h-8" /> {/* Bottom spacing */}
      </div>

      {/* History Modal */}
      <HistoryModal 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        history={caffeineHistory} 
      />
    </div>
  );
};

export default Index;
