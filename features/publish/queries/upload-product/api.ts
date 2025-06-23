import type { UploadProductParams } from "./types";

export async function uploadProduct(data: UploadProductParams) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("condition", data.condition);
  formData.append("estimatedValue", data.estimatedValue);
  formData.append("location", data.location);
  formData.append("desiredItems", data.desiredItems.join(","));
  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append("image", file);
    });
  }
  const res = await fetch("/api/products", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Error al subir producto");
  return res.json();
}
