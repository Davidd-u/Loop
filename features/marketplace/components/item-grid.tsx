"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { ProductGridHeader } from "./product-grid-header";
import { LoadMoreButton } from "./load-more-button";
import { useProducts } from "../queries/use-products";
import { Product } from "../types/product";
import { ItemStatus, ItemCondition, Location } from "@/types";

export function ItemGrid() {
  const { products, loading } = useProducts();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortValue, setSortValue] = useState("newest");

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
    // Implementar paginación si es necesario
  };

  return (
    <div className="space-y-6">
      <ProductGridHeader
        totalCount={products.length}
        sortValue={sortValue}
        onSortChange={handleSortChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-400 py-12">
            Cargando productos...
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">
            No hay productos disponibles.
          </div>
        ) : (
          products.map((item) => (
            <ProductCard
              key={item.id}
              item={{
                ...item,
                images: [],
                category: { id: "", name: "", slug: "", icon: "" },
                userId: item.user.id,
                updatedAt: new Date(item.createdAt),
                status: ItemStatus.AVAILABLE,
                condition: item.condition as ItemCondition,
                user: {
                  id: item.user.id,
                  name: item.user.name,
                  email: "",
                  avatar: "",
                  location: {
                    id: "",
                    city: item.location.city ?? "",
                    state: item.location.state ?? "",
                    country: "",
                  },
                  rating: item.user.rating,
                  totalExchanges: item.user.totalExchanges,
                  joinedAt: new Date(),
                },
                location: {
                  id: "",
                  city: item.location.city ?? "",
                  state: item.location.state ?? "",
                  country: "",
                },
                createdAt: new Date(item.createdAt),
              }}
              isFavorite={favorites.has(item.id)}
              onToggleFavorite={toggleFavorite}
              onViewDetails={handleViewDetails}
              onProposeExchange={handleProposeExchange}
            />
          ))
        )}
      </div>

      <LoadMoreButton
        onLoadMore={handleLoadMore}
        loading={false}
        hasMore={false}
      />
    </div>
  );
}
