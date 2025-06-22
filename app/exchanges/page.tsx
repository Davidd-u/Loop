import { Header } from "@/components/layout/header";
import { ExchangesList } from "@/features/exchanges/components/exchanges-list";

export default function ExchangesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mis intercambios
          </h1>
          <p className="text-gray-600">
            Gestiona tus propuestas de intercambio y ve el estado de tus
            negociaciones.
          </p>
        </div>

        <ExchangesList />
      </main>
    </div>
  );
}
