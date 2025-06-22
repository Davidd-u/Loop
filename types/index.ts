// Tipos para items de intercambio
export interface ExchangeItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: Category;
  condition: ItemCondition;
  estimatedValue: number;
  userId: string;
  user: User;
  location: Location;
  desiredItems: string[];
  createdAt: Date;
  updatedAt: Date;
  status: ItemStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location: Location;
  rating: number;
  totalExchanges: number;
  joinedAt: Date;
}

export interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface ExchangeRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromItem: ExchangeItem;
  toItem: ExchangeItem;
  message: string;
  status: ExchangeStatus;
  createdAt: Date;
  updatedAt: Date;
  meetingPoint?: MeetingPoint;
}

export interface MeetingPoint {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  suggestedBy: string;
  agreedAt?: Date;
}

// Enums
export enum ItemCondition {
  NEW = "new",
  LIKE_NEW = "like_new",
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
}

export enum ItemStatus {
  AVAILABLE = "available",
  RESERVED = "reserved",
  EXCHANGED = "exchanged",
  REMOVED = "removed",
}

export enum ExchangeStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

// Interfaces para filtros y búsqueda
export interface SearchFilters {
  query?: string;
  categoryId?: string;
  condition?: ItemCondition;
  location?: string;
  radius?: number;
  minValue?: number;
  maxValue?: number;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
