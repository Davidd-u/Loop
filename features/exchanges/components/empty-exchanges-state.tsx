"use client";

interface EmptyExchangesStateProps {
  type: "sent" | "received";
}

export function EmptyExchangesState({ type }: EmptyExchangesStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-6xl mb-4">📦</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {type === "sent"
          ? "No has enviado propuestas"
          : "No has recibido propuestas"}
      </h3>
      <p className="text-gray-500">
        {type === "sent"
          ? "Explora el marketplace y propón intercambios interesantes"
          : "Publica productos atractivos para recibir propuestas de intercambio"}
      </p>
    </div>
  );
}
