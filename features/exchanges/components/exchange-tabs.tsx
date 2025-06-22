"use client";

interface ExchangeTabsProps {
  activeTab: "sent" | "received";
  onTabChange: (tab: "sent" | "received") => void;
  sentCount: number;
  receivedCount: number;
}

("use client");

import { Badge } from "@/components/ui/badge";

interface ExchangeTabsProps {
  activeTab: "sent" | "received";
  onTabChange: (tab: "sent" | "received") => void;
  sentCount: number;
  receivedCount: number;
}

export function ExchangeTabs({
  activeTab,
  onTabChange,
  sentCount,
  receivedCount,
}: ExchangeTabsProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-2 mb-6">
      <nav className="flex space-x-2">
        <button
          onClick={() => onTabChange("sent")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
            activeTab === "sent"
              ? "bg-white shadow-md text-blue-600 transform scale-[1.02]"
              : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
          }`}>
          📤 Propuestas enviadas
          <Badge
            variant={activeTab === "sent" ? "default" : "secondary"}
            className="text-xs">
            {sentCount}
          </Badge>
        </button>
        <button
          onClick={() => onTabChange("received")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
            activeTab === "received"
              ? "bg-white shadow-md text-blue-600 transform scale-[1.02]"
              : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
          }`}>
          📥 Propuestas recibidas
          <Badge
            variant={activeTab === "received" ? "default" : "secondary"}
            className="text-xs">
            {receivedCount}
          </Badge>
        </button>
      </nav>
    </div>
  );
}
