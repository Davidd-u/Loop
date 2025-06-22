"use client";

import { Button } from "@/components/ui/button";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  loading?: boolean;
  hasMore?: boolean;
}

export function LoadMoreButton({
  onLoadMore,
  loading = false,
  hasMore = true,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">
          No hay más productos para mostrar
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        onClick={onLoadMore}
        disabled={loading}
        className="px-6">
        {loading ? "Cargando..." : "Cargar más productos"}
      </Button>
    </div>
  );
}
