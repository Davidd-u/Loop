"use client";

import { useState } from "react";
import { ExchangeItem, ItemCondition } from "@/types";
import { Heart, MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card-custom";
import { Badge } from "@/components/ui/badge-custom";
import { Button } from "@/components/ui/button-custom";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  item: ExchangeItem;
  isFavorite?: boolean;
  onToggleFavorite?: (itemId: string) => void;
  onViewDetails?: (itemId: string) => void;
  onProposeExchange?: (itemId: string) => void;
}

function getConditionLabel(condition: ItemCondition): string {
  const labels = {
    [ItemCondition.NEW]: "Nuevo",
    [ItemCondition.LIKE_NEW]: "Como nuevo",
    [ItemCondition.GOOD]: "Bueno",
    [ItemCondition.FAIR]: "Regular",
    [ItemCondition.POOR]: "Malo",
  };
  return labels[condition];
}

function getConditionVariant(
  condition: ItemCondition
): "success" | "warning" | "destructive" | "info" | "gold" {
  const variants = {
    [ItemCondition.NEW]: "success" as const,
    [ItemCondition.LIKE_NEW]: "gold" as const,
    [ItemCondition.GOOD]: "info" as const,
    [ItemCondition.FAIR]: "warning" as const,
    [ItemCondition.POOR]: "destructive" as const,
  };
  return variants[condition];
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 24) {
    return `Hace ${diffInHours} horas`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} días`;
  }
}

export function ProductCard({
  item,
  isFavorite = false,
  onToggleFavorite,
  onViewDetails,
  onProposeExchange,
}: ProductCardProps) {
  const handleFavoriteClick = () => {
    onToggleFavorite?.(item.id);
  };

  const handleViewDetails = () => {
    onViewDetails?.(item.id);
  };

  const handleProposeExchange = () => {
    onProposeExchange?.(item.id);
  };
  return (
    <Card
      variant="elevated"
      className="overflow-hidden group hover:-translate-y-1 transition-all duration-300">
      {/* Imagen */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Botón favorito */}
        <button
          onClick={handleFavoriteClick}
          className={cn(
            "absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg",
            isFavorite
              ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-200"
              : "bg-white/90 text-gray-600 hover:bg-white shadow-gray-200 backdrop-blur-sm"
          )}>
          <Heart
            className={cn(
              "h-4 w-4 transition-all",
              isFavorite && "fill-current"
            )}
          />
        </button>

        {/* Badge de condición */}
        <div className="absolute bottom-3 left-3">
          <Badge
            variant={getConditionVariant(item.condition)}
            className="shadow-lg">
            {getConditionLabel(item.condition)}
          </Badge>
        </div>

        {/* Precio destacado */}
        <div className="absolute top-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${item.estimatedValue}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {" "}
        {/* Título y precio */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-lg leading-tight flex-1 pr-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </div>
        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        {/* Usuario */}
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full mr-2" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {item.user.name}
            </p>
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-500 ml-1">
                {item.user.rating} ({item.user.totalExchanges} intercambios)
              </span>
            </div>
          </div>
        </div>
        {/* Ubicación y tiempo */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {item.location.city}, {item.location.state}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatTimeAgo(item.createdAt)}
          </div>
        </div>{" "}
        {/* Items deseados */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2 font-medium">
            Busca intercambiar por:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {item.desiredItems.slice(0, 2).map((desiredItem, index) => (
              <Badge key={index} variant="purple" className="text-xs">
                {desiredItem}
              </Badge>
            ))}
            {item.desiredItems.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{item.desiredItems.length - 2} más
              </Badge>
            )}
          </div>
        </div>
        {/* Botones */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" onClick={handleViewDetails}>
            Ver detalles
          </Button>
          <Button size="sm" onClick={handleProposeExchange}>
            Proponer intercambio
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
