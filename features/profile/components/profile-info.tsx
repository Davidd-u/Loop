"use client";

import { useState } from "react";
import { Star, MapPin, Calendar, Edit, Camera } from "lucide-react";
import { User } from "@/types";

// Mock user data
const mockUser: User = {
  id: "current-user",
  name: "María González",
  email: "maria@example.com",
  avatar: "/images/avatar1.jpg",
  location: {
    id: "1",
    city: "Barcelona",
    state: "Cataluña",
    country: "España",
    coordinates: { lat: 41.3851, lng: 2.1734 },
  },
  rating: 4.8,
  totalExchanges: 15,
  joinedAt: new Date("2023-01-15"),
};

function formatJoinDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(mockUser);

  const handleSave = () => {
    // Aquí se guardarían los cambios
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Revertir cambios
    setUser(mockUser);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Cover image */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        {isEditing && (
          <button className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70">
            <Camera className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="flex items-end justify-between -mt-16 mb-4">
          <div className="relative">
            <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white"></div>
            {isEditing && (
              <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              <Edit className="h-4 w-4 mr-2" />
              Editar perfil
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Guardar
              </button>
            </div>
          )}
        </div>

        {/* User info */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            {isEditing ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
                className="text-2xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            )}
          </div>

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
            {isEditing ? (
              <input
                type="text"
                value={`${user.location.city}, ${user.location.state}, ${user.location.country}`}
                onChange={(e) => {
                  // Aquí se podría parsear la ubicación
                  const [city, state, country] = e.target.value.split(", ");
                  setUser((prev) => ({
                    ...prev,
                    location: { ...prev.location, city, state, country },
                  }));
                }}
                className="bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
              />
            ) : (
              <span>
                {user.location.city}, {user.location.state},{" "}
                {user.location.country}
              </span>
            )}
          </div>

          {/* Email */}
          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Bio */}
          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biografía
              </label>
              <textarea
                rows={3}
                placeholder="Cuéntanos un poco sobre ti..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {user.totalExchanges}
            </div>
            <div className="text-sm text-blue-800">
              Intercambios completados
            </div>
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
    </div>
  );
}
