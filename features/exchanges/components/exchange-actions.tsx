"use client";

import { ExchangeStatus } from "@/types";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button-custom";

interface ExchangeActionsProps {
  status: ExchangeStatus;
  isReceived: boolean;
  onMessage: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  onProposeMeeting?: () => void;
}

export function ExchangeActions({
  status,
  isReceived,
  onMessage,
  onAccept,
  onReject,
  onCancel,
  onComplete,
  onProposeMeeting,
}: ExchangeActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        onClick={onMessage}
        className="text-blue-600 hover:text-blue-700">
        <MessageCircle className="h-4 w-4 mr-1" />
        Enviar mensaje
      </Button>

      <div className="flex space-x-3">
        {status === ExchangeStatus.PENDING && (
          <>
            {isReceived ? (
              <>
                <Button variant="outline" size="sm" onClick={onReject}>
                  ❌ Rechazar
                </Button>
                <Button variant="success" size="sm" onClick={onAccept}>
                  ✅ Aceptar
                </Button>
              </>
            ) : (
              <Button variant="destructive" size="sm" onClick={onCancel}>
                🚫 Cancelar propuesta
              </Button>
            )}
          </>
        )}

        {status === ExchangeStatus.ACCEPTED && (
          <>
            <Button variant="outline" size="sm" onClick={onProposeMeeting}>
              📍 Proponer encuentro
            </Button>
            <Button variant="success" size="sm" onClick={onComplete}>
              ✅ Marcar completado
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
