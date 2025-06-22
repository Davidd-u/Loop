"use client";

import { useState } from "react";
import { ExchangeItem, ItemStatus, ItemCondition } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card-custom";
import { Button } from "@/components/ui/button-custom";
import { ItemTabs } from "./item-tabs";
import { UserItemCard } from "./user-item-card";

// Mock data
const mockUserItems: ExchangeItem[] = [
  {
    id: "1",
    title: "iPhone 13 Pro",
    description:
      "iPhone 13 Pro en excelente estado, con cargador original y funda protectora.",
    images: ["/images/iphone13pro.jpg"],
    category: {
      id: "1",
      name: "Electrónicos",
      slug: "electronics",
      icon: "📱",
    },
    condition: ItemCondition.LIKE_NEW,
    estimatedValue: 800,
    userId: "current-user",
    user: {} as any,
    location: {
      id: "1",
      city: "Barcelona",
      state: "Cataluña",
      country: "España",
    },
    desiredItems: ["MacBook", "iPad Pro", "AirPods Pro"],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    status: ItemStatus.AVAILABLE,
  },
  {
    id: "2",
    title: "Guitarra eléctrica Fender",
    description:
      "Fender Stratocaster americana, incluye amplificador y estuche.",
    images: ["/images/guitar.jpg"],
    category: { id: "8", name: "Música", slug: "music", icon: "🎸" },
    condition: ItemCondition.GOOD,
    estimatedValue: 650,
    userId: "current-user",
    user: {} as any,
    location: {
      id: "1",
      city: "Barcelona",
      state: "Cataluña",
      country: "España",
    },
    desiredItems: ["Bicicleta de montaña", "Equipo de camping"],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
    status: ItemStatus.RESERVED,
  },
  {
    id: "3",
    title: "PlayStation 5",
    description: "PS5 con dos controles y varios juegos incluidos.",
    images: ["/images/ps5.jpg"],
    category: {
      id: "1",
      name: "Electrónicos",
      slug: "electronics",
      icon: "📱",
    },
    condition: ItemCondition.LIKE_NEW,
    estimatedValue: 500,
    userId: "current-user",
    user: {} as any,
    location: {
      id: "1",
      city: "Barcelona",
      state: "Cataluña",
      country: "España",
    },
    desiredItems: ["Nintendo Switch", "Tablet"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    status: ItemStatus.EXCHANGED,
  },
];

export function UserItems() {
  const [activeTab, setActiveTab] = useState<ItemStatus | "all">("all");

  const filteredItems =
    activeTab === "all"
      ? mockUserItems
      : mockUserItems.filter((item) => item.status === activeTab);

  const counts = {
    all: mockUserItems.length,
    available: mockUserItems.filter((i) => i.status === ItemStatus.AVAILABLE)
      .length,
    reserved: mockUserItems.filter((i) => i.status === ItemStatus.RESERVED)
      .length,
    exchanged: mockUserItems.filter((i) => i.status === ItemStatus.EXCHANGED)
      .length,
  };

  const handleEdit = (itemId: string) => {
    console.log("Editar item:", itemId);
  };

  const handleDelete = (itemId: string) => {
    console.log("Eliminar item:", itemId);
  };

  const handleViewDetails = (itemId: string) => {
    console.log("Ver detalles:", itemId);
  };

  const handleViewMessages = (itemId: string) => {
    console.log("Ver mensajes:", itemId);
  };
  return (
    <Card variant="elevated">
      <CardHeader className="p-6 border-b bg-gradient-to-r from-gray-50 to-gray-100">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          📦 Mis productos
        </h2>
        <p className="text-gray-600 mt-1 font-medium">
          Gestiona tus publicaciones y ve su estado
        </p>
      </CardHeader>

      <ItemTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      <CardContent className="p-6">
        {" "}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-8xl mb-6">📦</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              No hay productos en esta categoría
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Publica tu primer producto para comenzar a intercambiar con otros
              usuarios
            </p>
            <Button size="lg" className="px-8">
              ➕ Publicar producto
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <UserItemCard
                key={item.id}
                item={item}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => handleDelete(item.id)}
                onViewDetails={() => handleViewDetails(item.id)}
                onViewMessages={() => handleViewMessages(item.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
