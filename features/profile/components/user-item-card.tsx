"use client";

import { ExchangeItem, ItemCondition, ItemStatus } from "@/types";
import {
  Eye,
  Heart,
  Edit,
  Trash2,
  MessageCircle,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card-custom";
import { Badge } from "@/components/ui/badge-custom";
import { Button } from "@/components/ui/button-custom";

interface UserItemCardProps {
  item: ExchangeItem;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
  onViewMessages: () => void;
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

function getStatusInfo(status: ItemStatus) {
  switch (status) {
    case ItemStatus.AVAILABLE:
      return { label: "Disponible", variant: "success" as const };
    case ItemStatus.RESERVED:
      return { label: "Reservado", variant: "warning" as const };
    case ItemStatus.EXCHANGED:
      return { label: "Intercambiado", variant: "info" as const };
    case ItemStatus.REMOVED:
      return { label: "Retirado", variant: "secondary" as const };
    default:
      return { label: "Desconocido", variant: "secondary" as const };
  }
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function UserItemCard({
  item,
  onEdit,
  onDelete,
  onViewDetails,
  onViewMessages,
}: UserItemCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const statusInfo = getStatusInfo(item.status);
  return (
    <Card
      variant="elevated"
      className="overflow-hidden group hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="absolute top-3 left-3">
          <Badge variant={statusInfo.variant} className="shadow-lg">
            {statusInfo.label}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white transition-all hover:scale-105">
              <MoreVertical className="h-4 w-4 text-gray-600" />
            </button>
            {showMenu && (
              <>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border z-10 overflow-hidden">
                  <div className="py-2">
                    <button
                      onClick={onViewDetails}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <Eye className="h-4 w-4 mr-3" />
                      👁️ Ver detalles
                    </button>
                    <button
                      onClick={onEdit}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <Edit className="h-4 w-4 mr-3" />
                      ✏️ Editar
                    </button>
                    <button
                      onClick={onViewMessages}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <MessageCircle className="h-4 w-4 mr-3" />
                      💬 Ver mensajes
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={onDelete}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <Trash2 className="h-4 w-4 mr-3" />
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
                <div
                  className="fixed inset-0 z-5"
                  onClick={() => setShowMenu(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title and price */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 flex-1 pr-2">
            {item.title}
          </h3>
          <span className="text-sm font-bold text-blue-600 whitespace-nowrap">
            ${item.estimatedValue}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Condition and date */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>{getConditionLabel(item.condition)}</span>
          <span>{formatDate(item.createdAt)}</span>
        </div>

        {/* Desired items */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Busca intercambiar por:</p>
          <div className="flex flex-wrap gap-1">
            {item.desiredItems.slice(0, 2).map((desiredItem, index) => (
              <Badge key={index} variant="info" className="text-xs">
                {desiredItem}
              </Badge>
            ))}
            {item.desiredItems.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{item.desiredItems.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              245 vistas
            </span>
            <span className="flex items-center">
              <Heart className="h-3 w-3 mr-1" />
              12 favoritos
            </span>
          </div>
          <span className="text-xs text-gray-500">3 propuestas</span>
        </div>
      </CardContent>
    </Card>
  );
}
