import { ItemGrid } from "@/features/marketplace/components/item-grid";
import { SearchFilters } from "@/features/marketplace/components/search-filters";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Marketplace de Intercambios
          </h1>
          <p className="text-gray-600">
            Intercambia productos sin dinero. Encuentra lo que necesitas y
            ofrece lo que ya no usas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <div className="sticky top-4">
              <SearchFilters />
            </div>
          </div>
          <div className="lg:col-span-9">
            <ItemGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
