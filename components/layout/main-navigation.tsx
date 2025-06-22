"use client";

import {
  Search,
  Bell,
  Plus,
  User,
  ShoppingBag,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge-custom";

export function MainNavigation() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🔄 Loop
              </h1>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Navigation items */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </div>

            {/* Add product */}
            <Button size="sm" className="hidden sm:flex">
              <Plus className="h-4 w-4 mr-2" />
              Publicar
            </Button>

            {/* Quick nav */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Marketplace
              </Button>
              <Button variant="ghost" size="sm">
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Intercambios
              </Button>
            </div>

            {/* Profile */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
