import { useEffect, useState } from "react";
import { Product } from "../types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) =>
        data.map((item: any) => ({
          ...item,
          // Adaptar location si viene como string
          location:
            typeof item.location === "string"
              ? { city: item.location, state: "", country: "" }
              : item.location || { city: "", state: "", country: "" },
          user: item.user || { id: "", name: "", rating: 0, totalExchanges: 0 },
        }))
      )
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}
