"use client";

import { ExchangeItem, ItemCondition } from "@/types";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card-custom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

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
): "secondary" | "outline" {
  return "secondary";
}

export function ProductCard({
  item,
  isFavorite = false,
  onToggleFavorite,
  onViewDetails,
  onProposeExchange,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        "overflow-hidden group border-2 border-gray-200 transition-all duration-200 cursor-pointer h-full bg-white",
        hovered && "border-blue-400 shadow-lg"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleViewDetails}>
      {/* Imagen principal */}
      <div className="relative aspect-square w-full bg-gray-100">
        {item.images && item.images.length > 0 ? (
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-cover"
            sizes="400px"
            priority={false}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-5xl text-gray-300 select-none">
            {item.category?.icon || "🛒"}
          </div>
        )}
        {/* Botón favorito */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleFavoriteClick}
          className={cn(
            "absolute top-2 right-2 z-10 rounded-full shadow bg-white/80 hover:bg-gray-100 border border-gray-200 transition-all",
            isFavorite &&
              "bg-gradient-to-r from-red-500 to-pink-500 text-white border-none hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600"
          )}>
          <Heart
            className={cn(
              "h-5 w-5 transition-all",
              isFavorite && "fill-current"
            )}
          />
        </Button>
      </div>

      <CardContent className="p-3">
        {/* Precio y condición */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-lg font-bold text-gray-900">
            ${item.estimatedValue}
          </span>
          <Badge
            variant={getConditionVariant(item.condition)}
            className="text-xs px-2 py-0.5 text-gray-700 bg-gray-100 border border-gray-200">
            {getConditionLabel(item.condition)}
          </Badge>
        </div>
        {/* Título */}
        <h3 className="font-medium text-gray-900 text-base truncate mb-1">
          {item.title}
        </h3>
        {/* Ciudad y items deseados */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500">{item.location.city}</span>
          <div className="flex flex-wrap gap-1">
            {item.desiredItems.slice(0, 2).map((desiredItem, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100">
                {desiredItem}
              </Badge>
            ))}
            {item.desiredItems.length > 2 && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-0.5 text-gray-500 border-gray-300">
                +{item.desiredItems.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
