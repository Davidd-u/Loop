"use client";

import { useState } from "react";
import { Camera, X, Plus, MapPin } from "lucide-react";
import { ItemCondition } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useUploadProduct } from "../queries/use-upload-product";

interface FormData {
  title: string;
  description: string;
  category: string;
  condition: ItemCondition | "";
  estimatedValue: string;
  location: string;
  desiredItems: string[];
  images: string[];
}

export function PublishForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    condition: "",
    estimatedValue: "",
    location: "",
    desiredItems: [],
    images: [],
  });

  const [currentDesiredItem, setCurrentDesiredItem] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const uploadMutation = useUploadProduct();

  const categories = [
    { id: "1", name: "Electrónicos", slug: "electronics" },
    { id: "2", name: "Ropa", slug: "clothing" },
    { id: "3", name: "Hogar", slug: "home" },
    { id: "4", name: "Deportes", slug: "sports" },
    { id: "5", name: "Libros", slug: "books" },
    { id: "6", name: "Juguetes", slug: "toys" },
    { id: "7", name: "Vehículos", slug: "vehicles" },
    { id: "8", name: "Música", slug: "music" },
  ];

  const conditions = [
    { value: ItemCondition.NEW, label: "Nuevo" },
    { value: ItemCondition.LIKE_NEW, label: "Como nuevo" },
    { value: ItemCondition.GOOD, label: "Bueno" },
    { value: ItemCondition.FAIR, label: "Regular" },
    { value: ItemCondition.POOR, label: "Malo" },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addDesiredItem = () => {
    if (
      currentDesiredItem.trim() &&
      !formData.desiredItems.includes(currentDesiredItem.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        desiredItems: [...prev.desiredItems, currentDesiredItem.trim()],
      }));
      setCurrentDesiredItem("");
    }
  };

  const removeDesiredItem = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      desiredItems: prev.desiredItems.filter((i) => i !== item),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setFormData((prev) => ({
        ...prev,
        images: [URL.createObjectURL(file)],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    uploadMutation.mutate({
      ...formData,
      image: imageFile,
    });
  };

  const categoriesItems = categories.map((category) => (
    <SelectItem key={category.id} value={category.id}>
      {category.name}
    </SelectItem>
  ));

  const conditionsItems = conditions.map((condition) => (
    <SelectItem key={condition.value} value={condition.value}>
      {condition.label}
    </SelectItem>
  ));

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sección izquierda */}
        <div className="space-y-6">
          {/* Imágenes */}
          <div>
            <Label className="mb-2">Fotos del producto</Label>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {/* Placeholder para subir fotos */}
              <Label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 cursor-pointer p-0">
                <Camera className="mx-auto h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Agregar foto</span>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </Label>
              {/* Mostrar imágenes subidas */}
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative bg-gray-100 rounded-lg">
                  <Image
                    src={image}
                    alt="preview"
                    fill
                    className="object-cover rounded-lg"
                    style={{ objectFit: "cover" }}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-1 right-1 p-1 h-6 w-6"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        images: [],
                      }));
                      setImageFile(null);
                    }}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Puedes subir una foto. La primera será la foto principal.
            </p>
          </div>

          {/* Título */}
          <div>
            <Label htmlFor="title" className="mb-2">
              Título del producto *
            </Label>
            <Input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Ej: iPhone 13 Pro en excelente estado"
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.title.length}/100 caracteres
            </p>
          </div>

          {/* Descripción */}
          <div>
            <Label htmlFor="description" className="mb-2">
              Descripción *
            </Label>
            <Textarea
              id="description"
              required
              rows={6}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe tu producto: estado, características, accesorios incluidos, etc."
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/500 caracteres
            </p>
          </div>
        </div>

        {/* Sección derecha */}
        <div className="space-y-6">
          {/* Categoría */}
          <div>
            <Label htmlFor="category" className="mb-2">
              Categoría *
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>{categoriesItems}</SelectContent>
            </Select>
          </div>

          {/* Condición */}
          <div>
            <Label htmlFor="condition" className="mb-2">
              Condición *
            </Label>
            <Select
              value={formData.condition}
              onValueChange={(value) => handleInputChange("condition", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona la condición" />
              </SelectTrigger>
              <SelectContent>{conditionsItems}</SelectContent>
            </Select>
          </div>

          {/* Valor estimado */}
          <div>
            <Label htmlFor="estimatedValue" className="mb-2">
              Valor estimado (USD) *
            </Label>
            <Input
              type="number"
              id="estimatedValue"
              required
              min="1"
              value={formData.estimatedValue}
              onChange={(e) =>
                handleInputChange("estimatedValue", e.target.value)
              }
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Este valor ayuda a otros usuarios a evaluar intercambios justos
            </p>
          </div>

          {/* Ubicación */}
          <div>
            <Label htmlFor="location" className="mb-2">
              Ubicación *
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                id="location"
                required
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="pl-10"
                placeholder="Ciudad, Estado, País"
              />
            </div>
          </div>

          {/* Items deseados */}
          <div>
            <Label className="mb-2">¿Qué te interesa recibir a cambio?</Label>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                value={currentDesiredItem}
                onChange={(e) => setCurrentDesiredItem(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addDesiredItem())
                }
                className="flex-1"
                placeholder="Ej: MacBook, iPad, cámara fotográfica..."
              />
              <Button
                type="button"
                onClick={addDesiredItem}
                className="flex items-center"
                variant="default">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.desiredItems.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.desiredItems.map((item, index) => (
                  <Badge
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {item}
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeDesiredItem(item)}
                      className="ml-1 h-5 w-5 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Agrega productos específicos que te interesen o categorías
              generales
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" className="flex-1">
              Guardar borrador
            </Button>
            <Button type="submit" className="flex-1">
              Publicar producto
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
