"use client";

import { ExchangeRequest } from "@/types";
import { Card, CardContent } from "@/components/ui/card-custom";
import { ExchangeStatusBadge } from "./exchange-status-badge";
import { ExchangeItemCard } from "./exchange-item-card";
import { MeetingPointCard } from "./meeting-point-card";
import { ExchangeActions } from "./exchange-actions";

interface ExchangeCardProps {
  exchange: ExchangeRequest;
  isReceived: boolean;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function ExchangeCard({ exchange, isReceived }: ExchangeCardProps) {
  const otherUser = isReceived ? exchange.fromItem.user : exchange.toItem.user;
  const myItem = isReceived ? exchange.toItem : exchange.fromItem;
  const theirItem = isReceived ? exchange.fromItem : exchange.toItem;

  const handleMessage = () => {
    console.log("Enviar mensaje");
  };

  const handleAccept = () => {
    console.log("Aceptar intercambio");
  };

  const handleReject = () => {
    console.log("Rechazar intercambio");
  };

  const handleCancel = () => {
    console.log("Cancelar propuesta");
  };

  const handleComplete = () => {
    console.log("Marcar como completado");
  };

  const handleProposeMeeting = () => {
    console.log("Proponer encuentro");
  };
  return (
    <Card variant="elevated">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {otherUser.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">
                {otherUser.name}
              </p>
              <p className="text-sm text-gray-500">
                {isReceived ? "📥 Propuesta recibida" : "📤 Propuesta enviada"}{" "}
                • {formatDate(exchange.createdAt)}
              </p>
            </div>
          </div>
          <ExchangeStatusBadge status={exchange.status} />
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <ExchangeItemCard
            item={myItem}
            label={isReceived ? "Producto solicitado" : "Tu producto"}
            isOwn={!isReceived}
          />
          <ExchangeItemCard
            item={theirItem}
            label={isReceived ? "Producto ofrecido" : "Producto solicitado"}
            isOwn={isReceived}
          />
        </div>

        {/* Mensaje */}
        <Card className="bg-gray-50 mb-4">
          <CardContent className="p-4">
            <p className="text-sm text-gray-700">{exchange.message}</p>
          </CardContent>
        </Card>

        {/* Punto de encuentro */}
        {exchange.meetingPoint && (
          <div className="mb-4">
            <MeetingPointCard meetingPoint={exchange.meetingPoint} />
          </div>
        )}

        {/* Acciones */}
        <ExchangeActions
          status={exchange.status}
          isReceived={isReceived}
          onMessage={handleMessage}
          onAccept={handleAccept}
          onReject={handleReject}
          onCancel={handleCancel}
          onComplete={handleComplete}
          onProposeMeeting={handleProposeMeeting}
        />
      </CardContent>
    </Card>
  );
}
