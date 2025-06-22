"use client";

import { useState } from "react";
import { ExchangeItem, ItemStatus, ItemCondition } from "@/types";
import {
  Edit,
  Trash2,
  Eye,
  Heart,
  MessageCircle,
  MoreVertical,
} from "lucide-react";

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

function getStatusInfo(status: ItemStatus) {
  switch (status) {
    case ItemStatus.AVAILABLE:
      return {
        label: "Disponible",
        color: "text-green-700 bg-green-100",
      };
    case ItemStatus.RESERVED:
      return {
        label: "Reservado",
        color: "text-yellow-700 bg-yellow-100",
      };
    case ItemStatus.EXCHANGED:
      return {
        label: "Intercambiado",
        color: "text-blue-700 bg-blue-100",
      };
    case ItemStatus.REMOVED:
      return {
        label: "Retirado",
        color: "text-gray-700 bg-gray-100",
      };
    default:
      return {
        label: "Desconocido",
        color: "text-gray-700 bg-gray-100",
      };
  }
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

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function UserItems() {
  const [activeTab, setActiveTab] = useState<ItemStatus | "all">("all");
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const filteredItems =
    activeTab === "all"
      ? mockUserItems
      : mockUserItems.filter((item) => item.status === activeTab);

  const tabs = [
    { key: "all" as const, label: "Todos", count: mockUserItems.length },
    {
      key: ItemStatus.AVAILABLE,
      label: "Disponibles",
      count: mockUserItems.filter((i) => i.status === ItemStatus.AVAILABLE)
        .length,
    },
    {
      key: ItemStatus.RESERVED,
      label: "Reservados",
      count: mockUserItems.filter((i) => i.status === ItemStatus.RESERVED)
        .length,
    },
    {
      key: ItemStatus.EXCHANGED,
      label: "Intercambiados",
      count: mockUserItems.filter((i) => i.status === ItemStatus.EXCHANGED)
        .length,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Mis productos</h2>
        <p className="text-gray-600 mt-1">
          Gestiona tus publicaciones y ve su estado
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="px-6 -mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Items grid */}
      <div className="p-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay productos en esta categoría
            </h3>
            <p className="text-gray-500 mb-4">
              Publica tu primer producto para comenzar a intercambiar
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Publicar producto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const statusInfo = getStatusInfo(item.status);

              return (
                <div
                  key={item.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-200">
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowMenu(showMenu === item.id ? null : item.id)
                          }
                          className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>

                        {showMenu === item.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-10">
                            <div className="py-1">
                              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <Eye className="h-4 w-4 mr-2" />
                                Ver detalles
                              </button>
                              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </button>
                              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Ver mensajes
                              </button>
                              <div className="border-t border-gray-100"></div>
                              <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                      <span className="text-sm font-bold text-blue-600 ml-2">
                        ${item.estimatedValue}
                      </span>
                    </div>

                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{getConditionLabel(item.condition)}</span>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>

                    {/* Desired items */}
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">
                        Busca intercambiar por:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.desiredItems
                          .slice(0, 2)
                          .map((desiredItem, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                              {desiredItem}
                            </span>
                          ))}
                        {item.desiredItems.length > 2 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{item.desiredItems.length - 2}
                          </span>
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
                      <span className="text-xs text-gray-500">
                        3 propuestas
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Overlay para cerrar menú */}
      {showMenu && (
        <div className="fixed inset-0 z-5" onClick={() => setShowMenu(null)} />
      )}
    </div>
  );
}
