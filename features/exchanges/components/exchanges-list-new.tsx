"use client";

import { useState } from "react";
import { ExchangeRequest, ExchangeStatus } from "@/types";
import { ExchangeTabs } from "./exchange-tabs";
import { ExchangeCard } from "./exchange-card";
import { EmptyExchangesState } from "./empty-exchanges-state";

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
      <ExchangeTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sentCount={sentExchanges.length}
        receivedCount={receivedExchanges.length}
      />

      <div className="space-y-4">
        {currentExchanges.length === 0 ? (
          <EmptyExchangesState type={activeTab} />
        ) : (
          currentExchanges.map((exchange) => (
            <ExchangeCard
              key={exchange.id}
              exchange={exchange}
              isReceived={activeTab === "received"}
            />
          ))
        )}
      </div>
    </div>
  );
}
