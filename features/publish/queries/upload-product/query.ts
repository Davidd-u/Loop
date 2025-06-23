import { useMutation } from "@tanstack/react-query";
import { uploadProduct } from "./api";
import type { UploadProductParams } from "./types";

export function useUploadProduct() {
  return useMutation({
    mutationFn: (data: UploadProductParams) => uploadProduct(data),
  });
}
