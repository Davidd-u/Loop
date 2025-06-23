export interface UploadProductParams {
  title: string;
  description: string;
  category: string;
  condition: string;
  estimatedValue: string;
  location: string;
  desiredItems: string[];
  images?: File[]; // Cambia de image?: File | null a images?: File[]
}
