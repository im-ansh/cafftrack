export interface DrinkType {
  id: string;
  name: string;
  caffeinePerMl: number; // mg per ml
  image: string;
}

export interface DrinkSize {
  id: string;
  name: string;
  volume: number; // ml
}

export interface CaffeineEntry {
  id: string;
  date: string;
  drinkType: string;
  size: string;
  quantity: number;
  totalCaffeine: number;
  timestamp: number;
}

export interface CaffeineSession {
  entries: CaffeineEntry[];
  totalCaffeine: number;
  lastEntryTime?: number;
}