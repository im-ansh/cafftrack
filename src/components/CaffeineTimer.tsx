import { useState, useEffect } from 'react';
import { CAFFEINE_EFFECT_DURATION } from '@/data/drinks';

interface CaffeineTimerProps {
  lastCaffeineTime?: number;
}

export function CaffeineTimer({ lastCaffeineTime }: CaffeineTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    if (!lastCaffeineTime) {
      setTimeRemaining(0);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = now - lastCaffeineTime;
      const remaining = CAFFEINE_EFFECT_DURATION - elapsed;
      
      if (remaining <= 0) {
        setTimeRemaining(0);
      } else {
        setTimeRemaining(remaining);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [lastCaffeineTime]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (timeRemaining <= 0) {
    return (
      <div className="timer-display">
        <div className="text-sm text-muted-foreground">Caffeine Effect</div>
        <div className="text-2xl text-caffeine">No Active Caffeine</div>
      </div>
    );
  }

  return (
    <div className="timer-display">
      <div className="text-sm text-muted-foreground">Caffeine Effect Remaining</div>
      <div className="text-3xl text-caffeine">{formatTime(timeRemaining)}</div>
    </div>
  );
}