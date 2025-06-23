export interface UploadProductParams {
  title: string;
  description: string;
  category: string;
  condition: string;
  estimatedValue: string;
  location: string;
  desiredItems: string[];
  image?: File | null;
}

export async function uploadProduct({
  title,
  description,
  category,
  condition,
  estimatedValue,
  location,
  desiredItems,
  image,
}: UploadProductParams) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("condition", condition);
  formData.append("estimatedValue", estimatedValue);
  formData.append("location", location);
  formData.append("desiredItems", desiredItems.join(","));
  if (image) {
    formData.append("image", image);
  }

  const res = await fetch("/api/products", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Error al subir el producto");
  }
  return res.json();
}
