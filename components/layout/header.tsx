"use client";

import { useState } from "react";
import { Bell, MessageCircle, Plus, User, Menu, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { PublishDialog } from "@/features/publish/components/publish-dialog";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar búsqueda
    console.log("Buscando:", searchQuery);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + texto de marca */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <Image
                src="/assets/images/loop-logo.svg"
                alt="Loop"
                width={32}
                height={32}
                className="h-8 w-8"
                style={{
                  filter:
                    "invert(29%) sepia(94%) saturate(7497%) hue-rotate(203deg) brightness(98%) contrast(101%)",
                }} // azul tipo marca
                priority
              />
              <span className="text-2xl font-bold text-blue-600 tracking-tight select-none">
                Loop
              </span>
            </div>
          </div>

          {/* Barra de búsqueda */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar productos para intercambiar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </form>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            <PublishDialog
              triggerLabel="Publicar"
              triggerClassName="flex items-center px-4 py-2"
            />

            <Button
              variant="ghost"
              className="p-2 text-gray-600 hover:text-gray-900 relative">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            <Button
              variant="ghost"
              className="p-2 text-gray-600 hover:text-gray-900 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>

            {/* Menú de usuario */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">María</span>
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                  <div className="py-1">
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <a href="#">Mi perfil</a>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <a href="#">Mis publicaciones</a>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <a href="#">Intercambios</a>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <a href="#">Favoritos</a>
                    </Button>
                    <div className="border-t border-gray-100"></div>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <a href="#">Configuración</a>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <a href="#">Cerrar sesión</a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Botón menú móvil */}
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Búsqueda móvil */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </form>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="py-4 space-y-2">
              <PublishDialog
                triggerLabel="Publicar producto"
                triggerClassName="flex items-center w-full px-4 py-2"
              />

              <Button
                asChild
                variant="ghost"
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <a href="#">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Mensajes
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    3
                  </span>
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <a href="#">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificaciones
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    2
                  </span>
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <a href="#">
                  <User className="h-4 w-4 mr-2" />
                  Mi perfil
                </a>
              </Button>

              <div className="border-t pt-2 mt-2">
                <Button
                  asChild
                  variant="ghost"
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <a href="#">Mis publicaciones</a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <a href="#">Intercambios</a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <a href="#">Favoritos</a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <a href="#">Configuración</a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="block w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <a href="#">Cerrar sesión</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay para cerrar menús al hacer clic afuera */}
      {(isMenuOpen || isUserMenuOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsMenuOpen(false);
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </header>
  );
}
