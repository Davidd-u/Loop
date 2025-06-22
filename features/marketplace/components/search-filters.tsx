"use client";

import { useState } from "react";
import { MapPin, DollarSign, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select-simple";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card-custom";

interface SearchFiltersProps {
  onSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  query: string;
  category: string;
  condition: string;
  location: string;
  minValue: number;
  maxValue: number;
}

const categories = [
  { value: "", label: "Todas las categorías" },
  { value: "electronics", label: "📱 Electrónicos" },
  { value: "fashion", label: "👗 Moda y Accesorios" },
  { value: "home", label: "🏠 Hogar y Jardín" },
  { value: "sports", label: "⚽ Deportes" },
  { value: "books", label: "📚 Libros" },
  { value: "toys", label: "🧸 Juguetes" },
  { value: "vehicles", label: "🚗 Vehículos" },
  { value: "music", label: "🎸 Música" },
];

const conditions = [
  { value: "", label: "Cualquier condición" },
  { value: "new", label: "Nuevo" },
  { value: "like_new", label: "Como nuevo" },
  { value: "good", label: "Bueno" },
  { value: "fair", label: "Regular" },
  { value: "poor", label: "Malo" },
];

const locations = [
  { value: "", label: "Todas las ubicaciones" },
  { value: "barcelona", label: "Barcelona" },
  { value: "madrid", label: "Madrid" },
  { value: "valencia", label: "Valencia" },
  { value: "sevilla", label: "Sevilla" },
  { value: "bilbao", label: "Bilbao" },
];

export function SearchFilters({ onSearch = () => {} }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "",
    condition: "",
    location: "",
    minValue: 0,
    maxValue: 10000,
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const updateFilter = (key: keyof SearchFilters, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update active filters for display
    updateActiveFilters(newFilters);
  };

  const updateActiveFilters = (newFilters: SearchFilters) => {
    const active = [];
    if (newFilters.category) {
      const categoryLabel =
        categories.find((c) => c.value === newFilters.category)?.label || "";
      active.push(`Categoría: ${categoryLabel}`);
    }
    if (newFilters.condition) {
      const conditionLabel =
        conditions.find((c) => c.value === newFilters.condition)?.label || "";
      active.push(`Condición: ${conditionLabel}`);
    }
    if (newFilters.location) {
      const locationLabel =
        locations.find((l) => l.value === newFilters.location)?.label || "";
      active.push(`Ubicación: ${locationLabel}`);
    }
    if (newFilters.minValue > 0 || newFilters.maxValue < 10000) {
      active.push(`Precio: $${newFilters.minValue} - $${newFilters.maxValue}`);
    }
    setActiveFilters(active);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      query: "",
      category: "",
      condition: "",
      location: "",
      minValue: 0,
      maxValue: 10000,
    };
    setFilters(emptyFilters);
    setActiveFilters([]);
    onSearch(emptyFilters);
  };

  const removeFilter = (filterText: string) => {
    if (filterText.startsWith("Categoría:")) {
      updateFilter("category", "");
    } else if (filterText.startsWith("Condición:")) {
      updateFilter("condition", "");
    } else if (filterText.startsWith("Ubicación:")) {
      updateFilter("location", "");
    } else if (filterText.startsWith("Precio:")) {
      updateFilter("minValue", 0);
      updateFilter("maxValue", 10000);
    }
  };

  return (
    <Card variant="gradient" className="mb-6">
      <CardContent className="p-4">
        {/* Título del panel */}
        <h3 className="text-lg font-semibold mb-4">Filtros de búsqueda</h3>

        {/* Advanced filters - siempre visibles */}
        <div className="space-y-5 mb-5">
          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Package className="h-4 w-4 mr-2" />
              Categoría
            </label>
            <Select
              value={filters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="w-full">
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Package className="h-4 w-4 mr-2" />
              Condición
            </label>
            <Select
              value={filters.condition}
              onChange={(e) => updateFilter("condition", e.target.value)}
              className="w-full">
              {conditions.map((cond) => (
                <option key={cond.value} value={cond.value}>
                  {cond.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4 mr-2" />
              Ubicación
            </label>
            <Select
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              className="w-full">
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Price range */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <DollarSign className="h-4 w-4 mr-2" />
              Rango de precio
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-xs text-gray-500 w-10">Mínimo:</span>
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minValue}
                  onChange={(e) =>
                    updateFilter("minValue", parseInt(e.target.value) || 0)
                  }
                  className="text-sm"
                />
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 w-10">Máximo:</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxValue}
                  onChange={(e) =>
                    updateFilter("maxValue", parseInt(e.target.value) || 10000)
                  }
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botón para aplicar filtros */}
        <Button onClick={handleSearch} className="w-full mb-5">
          Aplicar filtros
        </Button>

        {/* Active filters - adaptado para formato vertical */}
        {activeFilters.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                Filtros activos:
              </span>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {activeFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-red-100 hover:text-red-700 group w-full justify-between py-1.5"
                  onClick={() => removeFilter(filter)}>
                  <span className="truncate">{filter}</span>
                  <X className="h-3 w-3 ml-1 flex-shrink-0 group-hover:text-red-600" />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
