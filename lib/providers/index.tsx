"use client";
import { ReactNode } from "react";
import { ReactQueryProvider } from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";
// importa aquí otros providers si los tienes

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        {/* Otros providers aquí si los necesitas */}
        {children}
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
