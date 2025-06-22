"use client";

import { useState } from "react";
import { Bell, MessageCircle, Plus, User, Search, Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">Loop</h1>
            </div>
          </div>

          {/* Búsqueda principal (desktop) */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos para intercambiar..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Publicar
            </button>

            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            {/* Menú de usuario */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">María</span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mi perfil
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mis publicaciones
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Intercambios
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Favoritos
                    </a>
                    <div className="border-t border-gray-100"></div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Configuración
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Cerrar sesión
                    </a>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Búsqueda móvil */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="py-4 space-y-2">
              <button className="flex items-center w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Publicar producto
              </button>

              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Mensajes
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  3
                </span>
              </a>

              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="h-4 w-4 mr-2" />
                Notificaciones
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  2
                </span>
              </a>

              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <User className="h-4 w-4 mr-2" />
                Mi perfil
              </a>

              <div className="border-t pt-2 mt-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Mis publicaciones
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Intercambios
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Favoritos
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Configuración
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                  Cerrar sesión
                </a>
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
