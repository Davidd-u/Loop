"use client";

import { MeetingPoint } from "@/types";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card-custom";

interface MeetingPointCardProps {
  meetingPoint: MeetingPoint;
}

export function MeetingPointCard({ meetingPoint }: MeetingPointCardProps) {
  return (
    <Card
      variant="gradient"
      className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-green-500 rounded-full mr-3">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-green-800 text-lg">
            📍 Punto de encuentro acordado
          </span>
        </div>
        <p className="text-sm text-green-800 font-bold mb-1">
          {meetingPoint.name}
        </p>
        <p className="text-sm text-green-700 mb-2">{meetingPoint.address}</p>
        {meetingPoint.agreedAt && (
          <p className="text-xs text-green-600 flex items-center">
            ✅ Acordado el{" "}
            {new Intl.DateTimeFormat("es-ES").format(meetingPoint.agreedAt)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
