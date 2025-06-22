"use client";

import { User } from "@/types";
import { Star, Calendar, MapPin } from "lucide-react";

interface ProfileStatsProps {
  user: User;
}

function formatJoinDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function ProfileStats({ user }: ProfileStatsProps) {
  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
          <span className="font-medium">{user.rating}</span>
          <span className="text-gray-500 ml-1">
            ({user.totalExchanges} intercambios)
          </span>
        </div>

        <div className="flex items-center text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">
            Miembro desde {formatJoinDate(user.joinedAt)}
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-600">
        <MapPin className="h-4 w-4 mr-1" />
        <span>
          {user.location.city}, {user.location.state}, {user.location.country}
        </span>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {user.totalExchanges}
          </div>
          <div className="text-sm text-blue-800">Intercambios completados</div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">5</div>
          <div className="text-sm text-green-800">Productos activos</div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {user.rating}
          </div>
          <div className="text-sm text-purple-800">Valoración promedio</div>
        </div>
      </div>
    </div>
  );
}
