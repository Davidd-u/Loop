"use client";

import { ExchangeItem, ItemCondition } from "@/types";
import { Heart, MapPin, Clock, Star, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card-custom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
    return `Hace ${diffInHours}h`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays}d`;
  }
}

export function ProductCard({
  item,
  isFavorite = false,
  onToggleFavorite,
  onViewDetails,
  onProposeExchange,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

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
      className={cn(
        "overflow-hidden group hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-blue-400",
        hovered && "shadow-2xl"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* Imagen */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Botón favorito */}
        <Button
          type="button"
          size="icon"
          variant={isFavorite ? "destructive" : "ghost"}
          onClick={handleFavoriteClick}
          className={cn(
            "absolute top-3 right-3 z-10 rounded-full shadow-lg",
            isFavorite
              ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-200"
              : "bg-white/90 text-gray-600 hover:bg-white shadow-gray-200 backdrop-blur-sm"
          )}>
          <Heart
            className={cn(
              "h-5 w-5 transition-all",
              isFavorite && "fill-current"
            )}
          />
        </Button>
        {/* Badge de condición */}
        <div className="absolute bottom-3 left-3 z-10">
          <Badge
            variant={getConditionVariant(item.condition)}
            className="shadow-lg text-xs px-3 py-1">
            {getConditionLabel(item.condition)}
          </Badge>
        </div>
        {/* Precio destacado */}
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${item.estimatedValue}
            </span>
          </div>
        </div>
        {/* Imagen real si existe */}
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0]}
            alt={item.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-5xl text-gray-300 select-none">
            {item.category?.icon || "🛒"}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Título y acciones rápidas */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight truncate max-w-[70%] group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <Button
            size="icon"
            variant="ghost"
            className="ml-2"
            onClick={handleViewDetails}
            aria-label="Ver detalles">
            <Eye className="h-5 w-5 text-blue-500" />
          </Button>
        </div>
        {/* Badges de usuario y ubicación */}
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1">
            <Star className="h-3 w-3 text-yellow-400" />
            <span className="text-xs">{item.user.rating}</span>
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-2 py-1">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{item.location.city}</span>
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-2 py-1">
            <Clock className="h-3 w-3" />
            <span className="text-xs">
              {formatTimeAgo(new Date(item.createdAt))}
            </span>
          </Badge>
        </div>
        {/* Items deseados */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1.5">
            {item.desiredItems.slice(0, 3).map((desiredItem, index) => (
              <Badge key={index} variant="purple" className="text-xs px-2 py-1">
                {desiredItem}
              </Badge>
            ))}
            {item.desiredItems.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-1">
                +{item.desiredItems.length - 3} más
              </Badge>
            )}
          </div>
        </div>
        {/* Descripción resumida */}
        <p className="text-gray-500 text-xs mb-3 line-clamp-1">
          {item.description}
        </p>
        {/* Botón de acción principal */}
        <Button
          size="sm"
          className="w-full mt-2"
          onClick={handleProposeExchange}>
          Proponer intercambio
        </Button>
      </CardContent>
    </Card>
  );
}
