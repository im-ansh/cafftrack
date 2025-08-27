import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CaffeineEntry } from '@/types/caffeine';
import { DRINK_TYPES, DRINK_SIZES } from '@/data/drinks';
import { format } from 'date-fns';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: Record<string, CaffeineEntry[]>;
}

export function HistoryModal({ isOpen, onClose, history }: HistoryModalProps) {
  const getDrinkName = (drinkId: string) => 
    DRINK_TYPES.find(d => d.id === drinkId)?.name || drinkId;
  
  const getSizeName = (sizeId: string) => 
    DRINK_SIZES.find(s => s.id === sizeId)?.name || sizeId;

  const sortedDates = Object.keys(history).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-center">
            Caffeine History
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {sortedDates.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No caffeine entries yet
            </div>
          ) : (
            sortedDates.map((date) => {
              const entries = history[date];
              const totalCaffeine = entries.reduce((sum, entry) => sum + entry.totalCaffeine, 0);
              
              return (
                <div key={date} className="caffeine-card">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-black text-lg">
                      {format(new Date(date), 'MMM dd, yyyy')}
                    </h3>
                    <div className="text-caffeine font-black">
                      {Math.round(totalCaffeine)} mg
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {entries.map((entry) => (
                      <div key={entry.id} className="flex justify-between text-sm">
                        <div className="text-foreground">
                          {entry.quantity}x {getDrinkName(entry.drinkType)} ({getSizeName(entry.size)})
                        </div>
                        <div className="text-muted-foreground">
                          {Math.round(entry.totalCaffeine)} mg
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}