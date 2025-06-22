"use client";

import { useState } from "react";
import { ExchangeItem, ItemCondition } from "@/types";
import { ProductCard } from "./product-card";
import { ProductGridHeader } from "./product-grid-header";
import { LoadMoreButton } from "./load-more-button";

// Mock data - en producción vendría de una API
const mockItems: ExchangeItem[] = [
  {
    id: "1",
    title: "iPhone 13 Pro",
    description:
      "iPhone 13 Pro en excelente estado, con cargador original y funda protectora. Batería al 95%.",
    images: ["/images/iphone13pro.jpg"],
    category: {
      id: "1",
      name: "Electrónicos",
      slug: "electronics",
      icon: "📱",
    },
    condition: ItemCondition.LIKE_NEW,
    estimatedValue: 800,
    userId: "1",
    user: {
      id: "1",
      name: "María González",
      email: "maria@example.com",
      avatar: "/images/avatar1.jpg",
      location: {
        id: "1",
        city: "Barcelona",
        state: "Cataluña",
        country: "España",
      },
      rating: 4.8,
      totalExchanges: 15,
      joinedAt: new Date("2023-01-15"),
    },
    location: {
      id: "1",
      city: "Barcelona",
      state: "Cataluña",
      country: "España",
    },
    desiredItems: ["MacBook", "iPad", "AirPods Pro"],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    status: "available" as any,
  },
  {
    id: "2",
    title: "Bicicleta de montaña Trek",
    description:
      "Bicicleta Trek X-Caliber 8 en buen estado. Ideal para senderos y montaña. Incluye casco.",
    images: ["/images/bike.jpg"],
    category: { id: "4", name: "Deportes", slug: "sports", icon: "⚽" },
    condition: ItemCondition.GOOD,
    estimatedValue: 600,
    userId: "2",
    user: {
      id: "2",
      name: "Carlos Ruiz",
      email: "carlos@example.com",
      avatar: "/images/avatar2.jpg",
      location: { id: "2", city: "Madrid", state: "Madrid", country: "España" },
      rating: 4.6,
      totalExchanges: 8,
      joinedAt: new Date("2023-03-10"),
    },
    location: { id: "2", city: "Madrid", state: "Madrid", country: "España" },
    desiredItems: ["Guitarra eléctrica", "Amplificador", "Equipo de sonido"],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
    status: "available" as any,
  },
  {
    id: "3",
    title: "Colección de libros de programación",
    description:
      "Set de 10 libros sobre JavaScript, React, Node.js y desarrollo web. Todos en perfecto estado.",
    images: ["/images/books.jpg"],
    category: { id: "5", name: "Libros", slug: "books", icon: "📚" },
    condition: ItemCondition.LIKE_NEW,
    estimatedValue: 200,
    userId: "3",
    user: {
      id: "3",
      name: "Ana López",
      email: "ana@example.com",
      avatar: "/images/avatar3.jpg",
      location: {
        id: "3",
        city: "Valencia",
        state: "Valencia",
        country: "España",
      },
      rating: 4.9,
      totalExchanges: 22,
      joinedAt: new Date("2022-11-05"),
    },
    location: {
      id: "3",
      city: "Valencia",
      state: "Valencia",
      country: "España",
    },
    desiredItems: ["Tablet", "Monitor 4K", "Teclado mecánico"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    status: "available" as any,
  },
  {
    id: "4",
    title: "Cafetera espresso Delonghi",
    description:
      "Cafetera espresso semiautomática, poco uso. Incluye molinillo y accesorios.",
    images: ["/images/coffee-machine.jpg"],
    category: { id: "3", name: "Hogar", slug: "home", icon: "🏠" },
    condition: ItemCondition.GOOD,
    estimatedValue: 300,
    userId: "4",
    user: {
      id: "4",
      name: "Diego Fernández",
      email: "diego@example.com",
      avatar: "/images/avatar4.jpg",
      location: {
        id: "4",
        city: "Sevilla",
        state: "Andalucía",
        country: "España",
      },
      rating: 4.7,
      totalExchanges: 12,
      joinedAt: new Date("2023-06-20"),
    },
    location: {
      id: "4",
      city: "Sevilla",
      state: "Andalucía",
      country: "España",
    },
    desiredItems: ["Aspiradora robot", "Plancha de vapor", "Licuadora"],
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
    status: "available" as any,
  },
];

export function ItemGrid() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortValue, setSortValue] = useState("newest");
  const [loading, setLoading] = useState(false);

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    // Aquí se implementaría la lógica de ordenamiento
  };

  const handleViewDetails = (itemId: string) => {
    // Navegar a detalles del producto
    console.log("Ver detalles:", itemId);
  };

  const handleProposeExchange = (itemId: string) => {
    // Abrir modal de propuesta de intercambio
    console.log("Proponer intercambio:", itemId);
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simular carga
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <ProductGridHeader
        totalCount={mockItems.length}
        sortValue={sortValue}
        onSortChange={handleSortChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockItems.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            isFavorite={favorites.has(item.id)}
            onToggleFavorite={toggleFavorite}
            onViewDetails={handleViewDetails}
            onProposeExchange={handleProposeExchange}
          />
        ))}
      </div>

      <LoadMoreButton
        onLoadMore={handleLoadMore}
        loading={loading}
        hasMore={true}
      />
    </div>
  );
}
