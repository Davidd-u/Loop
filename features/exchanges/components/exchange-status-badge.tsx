"use client";

import { ExchangeStatus } from "@/types";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge-custom";

interface ExchangeStatusBadgeProps {
  status: ExchangeStatus;
}

export function ExchangeStatusBadge({ status }: ExchangeStatusBadgeProps) {
  const getStatusInfo = (status: ExchangeStatus) => {
    switch (status) {
      case ExchangeStatus.PENDING:
        return {
          label: "Pendiente",
          variant: "warning" as const,
          icon: Clock,
        };
      case ExchangeStatus.ACCEPTED:
        return {
          label: "Aceptado",
          variant: "success" as const,
          icon: CheckCircle,
        };
      case ExchangeStatus.REJECTED:
        return {
          label: "Rechazado",
          variant: "destructive" as const,
          icon: XCircle,
        };
      case ExchangeStatus.COMPLETED:
        return {
          label: "Completado",
          variant: "info" as const,
          icon: CheckCircle,
        };
      case ExchangeStatus.CANCELLED:
        return {
          label: "Cancelado",
          variant: "secondary" as const,
          icon: XCircle,
        };
      default:
        return {
          label: "Desconocido",
          variant: "secondary" as const,
          icon: Clock,
        };
    }
  };

  const { label, variant, icon: Icon } = getStatusInfo(status);

  return (
    <Badge variant={variant} className="inline-flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}
