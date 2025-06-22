import { Header } from "@/components/layout/header";
import { PublishForm } from "@/features/publish/components/publish-form";

export default function PublishPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Publicar producto
            </h1>
            <p className="text-gray-600">
              Publica tu producto y encuentra a alguien interesado en hacer un
              intercambio.
            </p>
          </div>

          <PublishForm />
        </div>
      </main>
    </div>
  );
}
