"use client";

import { useState } from "react";
import { ExchangeRequest, ExchangeStatus } from "@/types";
import {
  MessageCircle,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  User,
} from "lucide-react";

// Mock data
const mockExchanges: ExchangeRequest[] = [
  {
    id: "1",
    fromUserId: "current-user",
    toUserId: "2",
    fromItem: {
      id: "1",
      title: "iPhone 13 Pro",
      description: "iPhone 13 Pro en excelente estado",
      images: ["/images/iphone13pro.jpg"],
      category: {
        id: "1",
        name: "Electrónicos",
        slug: "electronics",
        icon: "📱",
      },
      condition: "like_new" as any,
      estimatedValue: 800,
      userId: "current-user",
      user: {} as any,
      location: {
        id: "1",
        city: "Barcelona",
        state: "Cataluña",
        country: "España",
      },
      desiredItems: ["MacBook"],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "available" as any,
    },
    toItem: {
      id: "2",
      title: "MacBook Air M1",
      description: "MacBook Air M1 2020",
      images: ["/images/macbook.jpg"],
      category: {
        id: "1",
        name: "Electrónicos",
        slug: "electronics",
        icon: "📱",
      },
      condition: "good" as any,
      estimatedValue: 900,
      userId: "2",
      user: {
        id: "2",
        name: "Carlos Ruiz",
        email: "carlos@example.com",
        avatar: "/images/avatar2.jpg",
        location: {
          id: "2",
          city: "Madrid",
          state: "Madrid",
          country: "España",
        },
        rating: 4.6,
        totalExchanges: 8,
        joinedAt: new Date("2023-03-10"),
      },
      location: { id: "2", city: "Madrid", state: "Madrid", country: "España" },
      desiredItems: ["iPhone"],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "reserved" as any,
    },
    message:
      "Hola! Me interesa mucho tu MacBook. Mi iPhone está en perfecto estado, con caja original y todos los accesorios.",
    status: ExchangeStatus.PENDING,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    fromUserId: "3",
    toUserId: "current-user",
    fromItem: {
      id: "3",
      title: "Bicicleta de montaña",
      description: "Trek X-Caliber 8",
      images: ["/images/bike.jpg"],
      category: { id: "4", name: "Deportes", slug: "sports", icon: "⚽" },
      condition: "good" as any,
      estimatedValue: 600,
      userId: "3",
      user: {
        id: "3",
        name: "Ana López",
        email: "ana@example.com",
        avatar: "/images/avatar3.jpg",
        location: {
          id: "3",
          city: "Valencia",
          state: "Valencia",
          country: "España",
        },
        rating: 4.9,
        totalExchanges: 22,
        joinedAt: new Date("2022-11-05"),
      },
      location: {
        id: "3",
        city: "Valencia",
        state: "Valencia",
        country: "España",
      },
      desiredItems: ["Guitarra"],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "available" as any,
    },
    toItem: {
      id: "4",
      title: "Guitarra eléctrica Fender",
      description: "Fender Stratocaster americana",
      images: ["/images/guitar.jpg"],
      category: { id: "8", name: "Música", slug: "music", icon: "🎸" },
      condition: "like_new" as any,
      estimatedValue: 650,
      userId: "current-user",
      user: {} as any,
      location: {
        id: "1",
        city: "Barcelona",
        state: "Cataluña",
        country: "España",
      },
      desiredItems: ["Bicicleta"],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "reserved" as any,
    },
    message:
      "¡Hola! Tu guitarra se ve increíble. Te ofrezco mi bicicleta Trek que está en muy buen estado. ¿Te interesa?",
    status: ExchangeStatus.ACCEPTED,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-19"),
    meetingPoint: {
      id: "1",
      name: "Centro Comercial El Triangle",
      address: "Plaça de Catalunya, 4, Barcelona",
      coordinates: { lat: 41.3851, lng: 2.1734 },
      suggestedBy: "3",
      agreedAt: new Date("2024-01-19"),
    },
  },
];

function getStatusInfo(status: ExchangeStatus) {
  switch (status) {
    case ExchangeStatus.PENDING:
      return {
        label: "Pendiente",
        color: "text-yellow-700 bg-yellow-100",
        icon: Clock,
      };
    case ExchangeStatus.ACCEPTED:
      return {
        label: "Aceptado",
        color: "text-green-700 bg-green-100",
        icon: CheckCircle,
      };
    case ExchangeStatus.REJECTED:
      return {
        label: "Rechazado",
        color: "text-red-700 bg-red-100",
        icon: XCircle,
      };
    case ExchangeStatus.COMPLETED:
      return {
        label: "Completado",
        color: "text-blue-700 bg-blue-100",
        icon: CheckCircle,
      };
    case ExchangeStatus.CANCELLED:
      return {
        label: "Cancelado",
        color: "text-gray-700 bg-gray-100",
        icon: XCircle,
      };
    default:
      return {
        label: "Desconocido",
        color: "text-gray-700 bg-gray-100",
        icon: Clock,
      };
  }
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function ExchangesList() {
  const [activeTab, setActiveTab] = useState<"sent" | "received">("sent");

  const sentExchanges = mockExchanges.filter(
    (ex) => ex.fromUserId === "current-user"
  );
  const receivedExchanges = mockExchanges.filter(
    (ex) => ex.toUserId === "current-user"
  );

  const currentExchanges =
    activeTab === "sent" ? sentExchanges : receivedExchanges;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("sent")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "sent"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}>
            Propuestas enviadas ({sentExchanges.length})
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "received"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}>
            Propuestas recibidas ({receivedExchanges.length})
          </button>
        </nav>
      </div>

      {/* Lista de intercambios */}
      <div className="space-y-4">
        {currentExchanges.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === "sent"
                ? "No has enviado propuestas"
                : "No has recibido propuestas"}
            </h3>
            <p className="text-gray-500">
              {activeTab === "sent"
                ? "Explora el marketplace y propón intercambios interesantes"
                : "Publica productos atractivos para recibir propuestas de intercambio"}
            </p>
          </div>
        ) : (
          currentExchanges.map((exchange) => {
            const statusInfo = getStatusInfo(exchange.status);
            const StatusIcon = statusInfo.icon;
            const otherUser =
              activeTab === "sent"
                ? exchange.toItem.user
                : exchange.fromItem.user;
            const myItem =
              activeTab === "sent" ? exchange.fromItem : exchange.toItem;
            const theirItem =
              activeTab === "sent" ? exchange.toItem : exchange.fromItem;

            return (
              <div
                key={exchange.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {otherUser.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activeTab === "sent"
                            ? "Propuesta enviada"
                            : "Propuesta recibida"}{" "}
                          • {formatDate(exchange.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                      <StatusIcon className="h-4 w-4 mr-1" />
                      {statusInfo.label}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {/* Mi item */}
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">
                        {activeTab === "sent"
                          ? "Tu producto"
                          : "Producto solicitado"}
                      </p>
                      <div className="flex space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {myItem.title}
                          </h4>
                          <p className="text-sm text-gray-500 truncate">
                            {myItem.description}
                          </p>
                          <p className="text-sm font-medium text-blue-600">
                            ${myItem.estimatedValue}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Su item */}
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">
                        {activeTab === "sent"
                          ? "Producto solicitado"
                          : "Producto ofrecido"}
                      </p>
                      <div className="flex space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {theirItem.title}
                          </h4>
                          <p className="text-sm text-gray-500 truncate">
                            {theirItem.description}
                          </p>
                          <p className="text-sm font-medium text-blue-600">
                            ${theirItem.estimatedValue}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700">{exchange.message}</p>
                  </div>

                  {/* Punto de encuentro */}
                  {exchange.meetingPoint && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">
                          Punto de encuentro acordado
                        </span>
                      </div>
                      <p className="text-sm text-green-700">
                        {exchange.meetingPoint.name}
                      </p>
                      <p className="text-sm text-green-600">
                        {exchange.meetingPoint.address}
                      </p>
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex items-center justify-between">
                    <button className="flex items-center text-blue-600 hover:text-blue-700">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Enviar mensaje</span>
                    </button>

                    <div className="flex space-x-3">
                      {exchange.status === ExchangeStatus.PENDING && (
                        <>
                          {activeTab === "received" && (
                            <>
                              <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                                Rechazar
                              </button>
                              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Aceptar
                              </button>
                            </>
                          )}
                          {activeTab === "sent" && (
                            <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                              Cancelar propuesta
                            </button>
                          )}
                        </>
                      )}

                      {exchange.status === ExchangeStatus.ACCEPTED && (
                        <>
                          <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                            Proponer encuentro
                          </button>
                          <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
                            Marcar como completado
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
