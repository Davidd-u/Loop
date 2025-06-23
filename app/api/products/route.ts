import { productsDb } from "@/db";
import { products } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

// Carpeta para imágenes de productos
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "products");

export async function GET() {
  const result = await productsDb.select().from(products).all();
  const parsed = result.map((p) => ({
    ...p,
    desiredItems: p.desiredItems ? JSON.parse(p.desiredItems) : [],
    images: p.images ? JSON.parse(p.images) : [],
    location: {
      city: p.locationCity,
      state: p.locationState || "",
      country: p.locationCountry || "",
    },
  }));
  return NextResponse.json(parsed);
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.startsWith("multipart/form-data")) {
    return NextResponse.json(
      { error: "Formato no soportado" },
      { status: 400 }
    );
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const condition = formData.get("condition") as string;
  const estimatedValue = Number(formData.get("estimatedValue"));
  const locationCity = formData.get("location") as string;
  const desiredItems =
    (formData.get("desiredItems") as string)?.split(",") ?? [];

  // Manejar múltiples imágenes
  const images: string[] = [];
  const imageFiles = formData.getAll("image") as File[];
  if (imageFiles && imageFiles.length > 0) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    for (const imageFile of imageFiles) {
      if (imageFile && imageFile.size > 0) {
        const ext = path.extname(imageFile.name) || ".jpg";
        const filename = `${randomUUID()}${ext}`;
        const filePath = path.join(UPLOAD_DIR, filename);
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        await fs.writeFile(filePath, buffer);
        // Siempre guarda la ruta pública
        images.push(`/uploads/products/${filename}`);
      }
    }
  }

  const newProduct = {
    id: randomUUID(),
    title,
    description,
    category,
    condition,
    estimatedValue,
    locationCity,
    locationState: "",
    locationCountry: "",
    desiredItems: JSON.stringify(desiredItems),
    images: JSON.stringify(images),
    createdAt: new Date().toISOString(),
  };

  await productsDb.insert(products).values(newProduct);

  return NextResponse.json(
    {
      ...newProduct,
      desiredItems,
      images,
      location: { city: locationCity, state: "", country: "" },
    },
    { status: 201 }
  );
}
