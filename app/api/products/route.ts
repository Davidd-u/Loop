import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const DATA_FILE = path.join(process.cwd(), "products.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function readProducts() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeProducts(products: any[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

export async function GET() {
  const products = await readProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.startsWith("multipart/form-data")) {
    return NextResponse.json(
      { error: "Formato no soportado" },
      { status: 400 }
    );
  }

  // @ts-ignore
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const condition = formData.get("condition") as string;
  const estimatedValue = Number(formData.get("estimatedValue"));
  const locationStr = formData.get("location") as string;
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
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const filePath = path.join(UPLOAD_DIR, filename);
        await fs.writeFile(filePath, buffer);
        images.push(`/uploads/${filename}`);
      }
    }
  }

  // Guardar location como objeto
  const location = {
    id: randomUUID(),
    city: locationStr,
    state: "",
    country: "",
  };

  const products = await readProducts();
  const newProduct = {
    id: randomUUID(),
    title,
    description,
    category,
    condition,
    estimatedValue,
    location,
    desiredItems,
    images,
    createdAt: new Date().toISOString(),
  };
  products.unshift(newProduct);
  await writeProducts(products);
  return NextResponse.json(newProduct, { status: 201 });
}
