import { NextRequest, NextResponse } from "next/server";

// Array global en memoria para almacenar productos mientras el servidor esté en ejecución
type Product = {
  id: string;
  title: string;
  description: string;
  estimatedValue: number;
  condition: string;
  location: { city: string; state: string };
  user: { id: string; name: string; rating: number; totalExchanges: number };
  desiredItems: string[];
  createdAt: string;
};

// Este array se reinicia si el servidor se reinicia
let products: Product[] = [
  {
    id: "1",
    title: "iPhone 13 Pro",
    description:
      "iPhone 13 Pro en excelente estado, con cargador original y funda protectora. Batería al 95%.",
    estimatedValue: 800,
    condition: "like_new",
    location: { city: "Barcelona", state: "Cataluña" },
    user: {
      id: "1",
      name: "María González",
      rating: 4.8,
      totalExchanges: 15,
    },
    desiredItems: ["MacBook", "iPad", "AirPods Pro"],
    createdAt: new Date("2024-01-20").toISOString(),
  },
  {
    id: "2",
    title: "Bicicleta de montaña Trek",
    description:
      "Bicicleta Trek X-Caliber 8 en buen estado. Ideal para senderos y montaña. Incluye casco.",
    estimatedValue: 600,
    condition: "good",
    location: { city: "Madrid", state: "Madrid" },
    user: {
      id: "2",
      name: "Carlos Ruiz",
      rating: 4.6,
      totalExchanges: 8,
    },
    desiredItems: ["Guitarra eléctrica", "Amplificador", "Equipo de sonido"],
    createdAt: new Date("2024-01-18").toISOString(),
  },
  {
    id: "3",
    title: "Colección de libros de programación",
    description:
      "Set de 10 libros sobre JavaScript, React, Node.js y desarrollo web. Todos en perfecto estado.",
    estimatedValue: 200,
    condition: "like_new",
    location: { city: "Valencia", state: "Valencia" },
    user: {
      id: "3",
      name: "Ana López",
      rating: 4.9,
      totalExchanges: 22,
    },
    desiredItems: ["Tablet", "Monitor 4K", "Teclado mecánico"],
    createdAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "4",
    title: "Cafetera espresso Delonghi",
    description:
      "Cafetera espresso semiautomática, poco uso. Incluye molinillo y accesorios.",
    estimatedValue: 300,
    condition: "good",
    location: { city: "Sevilla", state: "Andalucía" },
    user: {
      id: "4",
      name: "Diego Fernández",
      rating: 4.7,
      totalExchanges: 12,
    },
    desiredItems: ["Aspiradora robot", "Plancha de vapor", "Licuadora"],
    createdAt: new Date("2024-01-16").toISOString(),
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const product = products.find((p) => p.id === id);
    if (!product) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }
    return NextResponse.json(product);
  }
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    title,
    description,
    estimatedValue,
    condition,
    location,
    user,
    desiredItems,
  } = body;
  const newProduct: Product = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    description,
    estimatedValue,
    condition,
    location,
    user,
    desiredItems,
    createdAt: new Date().toISOString(),
  };
  products.unshift(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }
  products = products.filter((p) => p.id !== id);
  return new NextResponse(null, { status: 204 });
}
