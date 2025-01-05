import { useEffect, useState } from "react";
import { loadApi } from "../actions/LoadApi";
import { Product } from "../interface/req.api";

export default function useApi() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadApi()
      .then((products) => setProducts(products))
      .catch((error) => console.error("Failed to load products:", error));
  }, []);

  return { products };
}
