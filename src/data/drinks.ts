import { DrinkType, DrinkSize } from '@/types/caffeine';
import blackCoffeeImg from '@/assets/black-coffee.png';
import cafeMacchiatoImg from '@/assets/cafe-macchiato.png';
import cafeLatteImg from '@/assets/cafe-latte.png';
import chaiTeaImg from '@/assets/chai-tea.png';

export const DRINK_TYPES: DrinkType[] = [
  {
    id: 'black-coffee',
    name: 'Black Coffee',
    caffeinePerMl: 0.4, // 95mg per 237ml
    image: blackCoffeeImg,
  },
  {
    id: 'cafe-macchiato',
    name: 'Café Macchiato',
    caffeinePerMl: 0.32, // 75mg per 237ml
    image: cafeMacchiatoImg,
  },
  {
    id: 'cafe-latte',
    name: 'Café Latte',
    caffeinePerMl: 0.32, // 75mg per 237ml
    image: cafeLatteImg,
  },
  {
    id: 'chai-tea',
    name: 'Chai Tea',
    caffeinePerMl: 0.063, // 15mg per 240ml
    image: chaiTeaImg,
  },
];

export const DRINK_SIZES: DrinkSize[] = [
  {
    id: 'small',
    name: 'Small',
    volume: 240,
  },
  {
    id: 'medium',
    name: 'Medium',
    volume: 355,
  },
  {
    id: 'large',
    name: 'Large',
    volume: 473,
  },
  {
    id: 'extra-large',
    name: 'Extra Large',
    volume: 591,
  },
];

// Caffeine effect duration in milliseconds (6 hours)
export const CAFFEINE_EFFECT_DURATION = 6 * 60 * 60 * 1000;