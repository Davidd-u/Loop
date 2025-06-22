"use client";

import { ItemStatus } from "@/types";

interface ItemTabsProps {
  activeTab: ItemStatus | "all";
  onTabChange: (tab: ItemStatus | "all") => void;
  counts: Record<string, number>;
}

export function ItemTabs({ activeTab, onTabChange, counts }: ItemTabsProps) {
  const tabs = [
    { key: "all" as const, label: "Todos", count: counts.all },
    {
      key: ItemStatus.AVAILABLE,
      label: "Disponibles",
      count: counts.available,
    },
    { key: ItemStatus.RESERVED, label: "Reservados", count: counts.reserved },
    {
      key: ItemStatus.EXCHANGED,
      label: "Intercambiados",
      count: counts.exchanged,
    },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="px-6 -mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === tab.key
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}>
            {tab.label} ({tab.count})
          </button>
        ))}
      </nav>
    </div>
  );
}
