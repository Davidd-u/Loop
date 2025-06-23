export interface PublishProductInput {
  title: string;
  description: string;
  category: string;
  condition: string;
  estimatedValue: string;
  location: string;
  desiredItems: string[];
  image?: File | null;
}
