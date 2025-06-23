import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!product) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }
    return NextResponse.json(product);
  }
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });
  return NextResponse.json(products);
}

// POST /api/products
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
    images,
  } = body;

  const product = await prisma.product.create({
    data: {
      title,
      description,
      estimatedValue: Number(estimatedValue),
      condition,
      locationCity: location.city,
      locationState: location.state,
      userId: user.id,
      userName: user.name,
      userRating: user.rating,
      userTotalExchanges: user.totalExchanges,
      desiredItems,
      images: {
        create: (images || []).map((url: string) => ({ url })),
      },
    },
    include: { images: true },
  });

  return NextResponse.json(product, { status: 201 });
}

// DELETE /api/products?id=xxx
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }
  await prisma.image.deleteMany({ where: { productId: id } });
  await prisma.product.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
