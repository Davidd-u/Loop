"use client";

import { Select } from "@/components/ui/select-simple";

interface ProductGridHeaderProps {
  totalCount: number;
  sortValue: string;
  onSortChange: (value: string) => void;
}

export function ProductGridHeader({
  totalCount,
  sortValue,
  onSortChange,
}: ProductGridHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Productos disponibles
        </h2>
        <p className="text-gray-600 font-medium">
          {totalCount} productos encontrados
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
        <Select
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-48">
          <option value="newest">Más recientes</option>
          <option value="oldest">Más antiguos</option>
          <option value="highest-value">Mayor valor</option>
          <option value="lowest-value">Menor valor</option>
          <option value="nearest">Más cercanos</option>
          <option value="most-viewed">Más vistos</option>
        </Select>
      </div>
    </div>
  );
}
