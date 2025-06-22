"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileAvatarProps {
  isEditing: boolean;
  avatarUrl?: string;
  onAvatarChange?: (file: File) => void;
}

export function ProfileAvatar({
  isEditing,
  avatarUrl,
  onAvatarChange,
}: ProfileAvatarProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onAvatarChange?.(file);
    }
  };

  return (
    <div className="relative">
      <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white overflow-hidden">
        {(preview || avatarUrl) && (
          <img
            src={preview || avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {isEditing && (
        <label className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 cursor-pointer">
          <Camera className="h-4 w-4" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
      )}
    </div>
  );
}
