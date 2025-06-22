"use client";

import { useState } from "react";
import { Camera, X, Plus, MapPin } from "lucide-react";
import { ItemCondition } from "@/types";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Publicar producto:", formData);
    // Aquí se enviaría a la API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
      {/* Imágenes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fotos del producto
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Placeholder para subir fotos */}
          <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 cursor-pointer">
            <div className="text-center">
              <Camera className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Agregar foto</p>
            </div>
          </div>

          {/* Mostrar imágenes subidas */}
          {formData.images.map((image, index) => (
            <div
              key={index}
              className="aspect-square relative bg-gray-100 rounded-lg">
              <button
                type="button"
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== index),
                  }));
                }}>
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Puedes subir hasta 8 fotos. La primera será la foto principal.
        </p>
      </div>

      {/* Título */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2">
          Título del producto *
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ej: iPhone 13 Pro en excelente estado"
          maxLength={100}
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.title.length}/100 caracteres
        </p>
      </div>

      {/* Descripción */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2">
          Descripción *
        </label>
        <textarea
          id="description"
          required
          rows={4}
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe tu producto: estado, características, accesorios incluidos, etc."
          maxLength={500}
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.description.length}/500 caracteres
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Categoría */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2">
            Categoría *
          </label>
          <select
            id="category"
            required
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Condición */}
        <div>
          <label
            htmlFor="condition"
            className="block text-sm font-medium text-gray-700 mb-2">
            Condición *
          </label>
          <select
            id="condition"
            required
            value={formData.condition}
            onChange={(e) => handleInputChange("condition", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Selecciona la condición</option>
            {conditions.map((condition) => (
              <option key={condition.value} value={condition.value}>
                {condition.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Valor estimado */}
      <div>
        <label
          htmlFor="estimatedValue"
          className="block text-sm font-medium text-gray-700 mb-2">
          Valor estimado (USD) *
        </label>
        <input
          type="number"
          id="estimatedValue"
          required
          min="1"
          value={formData.estimatedValue}
          onChange={(e) => handleInputChange("estimatedValue", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="0"
        />
        <p className="text-xs text-gray-500 mt-1">
          Este valor ayuda a otros usuarios a evaluar intercambios justos
        </p>
      </div>

      {/* Ubicación */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-2">
          Ubicación *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            id="location"
            required
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ciudad, Estado, País"
          />
        </div>
      </div>

      {/* Items deseados */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Qué te interesa recibir a cambio?
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={currentDesiredItem}
            onChange={(e) => setCurrentDesiredItem(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addDesiredItem())
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: MacBook, iPad, cámara fotográfica..."
          />
          <button
            type="button"
            onClick={addDesiredItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {formData.desiredItems.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.desiredItems.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {item}
                <button
                  type="button"
                  onClick={() => removeDesiredItem(item)}
                  className="ml-1 text-blue-600 hover:text-blue-800">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Agrega productos específicos que te interesen o categorías generales
        </p>
      </div>

      {/* Botones */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          Guardar borrador
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Publicar producto
        </button>
      </div>
    </form>
  );
}
