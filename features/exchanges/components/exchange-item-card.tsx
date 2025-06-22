"use client";

import { ExchangeItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card-custom";

interface ExchangeItemCardProps {
  item: ExchangeItem;
  label: string;
  isOwn?: boolean;
}

export function ExchangeItemCard({
  item,
  label,
  isOwn = false,
}: ExchangeItemCardProps) {
  return (
    <Card
      variant="gradient"
      className={
        isOwn
          ? "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50"
          : ""
      }>
      <CardContent className="p-4">
        <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
          {isOwn ? "🏠" : "🎯"} {label}
        </p>
        <div className="flex space-x-3">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 truncate text-lg">
              {item.title}
            </h4>
            <p className="text-sm text-gray-600 truncate mb-2">
              {item.description}
            </p>
            <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              💰 ${item.estimatedValue}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
