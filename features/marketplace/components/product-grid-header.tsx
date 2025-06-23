"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
        <Select value={sortValue} onValueChange={onSortChange}>
          <SelectTrigger className="w-48" aria-label="Ordenar por">
            <SelectValue placeholder="Más recientes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Más recientes</SelectItem>
            <SelectItem value="oldest">Más antiguos</SelectItem>
            <SelectItem value="highest-value">Mayor valor</SelectItem>
            <SelectItem value="lowest-value">Menor valor</SelectItem>
            <SelectItem value="nearest">Más cercanos</SelectItem>
            <SelectItem value="most-viewed">Más vistos</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
