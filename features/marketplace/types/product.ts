export interface Product {
  id: string;
  title: string;
  description: string;
  estimatedValue: number;
  condition: string;
  location: { city: string; state: string };
  user: { id: string; name: string; rating: number; totalExchanges: number };
  desiredItems: string[];
  images: string[]; // <-- Añade esta línea
  createdAt: string;
}
