"use client";

import { User } from "@/types";
import { Button } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select-simple";

interface ProfileFormProps {
  user: User;
  isEditing: boolean;
  onUserChange: (user: User) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileForm({
  user,
  isEditing,
  onUserChange,
  onSave,
  onCancel,
}: ProfileFormProps) {
  const updateUser = (field: keyof User, value: any) => {
    onUserChange({ ...user, [field]: value });
  };

  const updateLocation = (field: string, value: string) => {
    const [city, state, country] = value.split(", ");
    onUserChange({
      ...user,
      location: { ...user.location, city, state, country },
    });
  };
  if (!isEditing) {
    return (
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
          {user.name}
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre completo
        </label>
        <Input
          type="text"
          value={user.name}
          onChange={(e) => updateUser("name", e.target.value)}
          placeholder="Tu nombre completo"
          className="text-lg font-semibold"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ubicación
        </label>
        <Select
          value={`${user.location.city}, ${user.location.state}, ${user.location.country}`}
          onChange={(e) => updateLocation("location", e.target.value)}>
          <option value="Barcelona, Cataluña, España">
            Barcelona, Cataluña, España
          </option>
          <option value="Madrid, Madrid, España">Madrid, Madrid, España</option>
          <option value="Valencia, Valencia, España">
            Valencia, Valencia, España
          </option>
          <option value="Sevilla, Andalucía, España">
            Sevilla, Andalucía, España
          </option>
          <option value="Bilbao, País Vasco, España">
            Bilbao, País Vasco, España
          </option>
        </Select>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <Input
          type="email"
          value={user.email}
          onChange={(e) => updateUser("email", e.target.value)}
          placeholder="tu.email@ejemplo.com"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Biografía
        </label>
        <Textarea
          rows={4}
          placeholder="Cuéntanos un poco sobre ti, tus intereses y qué tipo de intercambios te gustan..."
        />
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel} size="lg">
          Cancelar
        </Button>
        <Button onClick={onSave} size="lg" className="flex-1">
          💾 Guardar cambios
        </Button>
      </div>
    </div>
  );
}
