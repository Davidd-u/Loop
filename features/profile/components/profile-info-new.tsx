"use client";

import { useState } from "react";
import { Edit, Camera } from "lucide-react";
import { User } from "@/types";
import { Card, CardContent } from "@/components/ui/card-custom";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileStats } from "./profile-stats";
import { ProfileForm } from "./profile-form";

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

  const handleAvatarChange = (file: File) => {
    // Aquí se subiría la imagen
    console.log("Subir avatar:", file);
  };
  return (
    <Card variant="elevated" className="overflow-hidden">
      {/* Cover image */}
      <div className="h-36 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 relative">
        {isEditing && (
          <button className="absolute top-4 right-4 p-3 bg-black/30 backdrop-blur-sm text-white rounded-xl hover:bg-black/50 transition-all">
            <Camera className="h-5 w-5" />
          </button>
        )}
        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>{" "}
      <CardContent className="relative px-6 pb-6">
        {/* Avatar and edit button */}
        <div className="flex items-end justify-between -mt-20 mb-6">
          <ProfileAvatar
            isEditing={isEditing}
            avatarUrl={user.avatar}
            onAvatarChange={handleAvatarChange}
          />

          {!isEditing && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 shadow-lg"
              size="lg">
              <Edit className="h-4 w-4" />
              ✏️ Editar perfil
            </Button>
          )}
        </div>

        {/* User info and form */}
        <div className="space-y-4">
          <ProfileForm
            user={user}
            isEditing={isEditing}
            onUserChange={setUser}
            onSave={handleSave}
            onCancel={handleCancel}
          />

          {!isEditing && <ProfileStats user={user} />}
        </div>
      </CardContent>
    </Card>
  );
}
