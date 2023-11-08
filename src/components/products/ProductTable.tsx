"use client";

import { Card } from "@/components/ui/card";

import { useProductStore } from "@/app/store/productStore";
import { useEffect } from "react";

export function ProductTable() {
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    useProductStore.persist.rehydrate();
  }, []);

  return (
    <Card className="w-full my-8">
      {products.length === 0 && (
        <div className="p-4 text-center">
          <p>No products added yet</p>
        </div>
      )}

      {products.length > 0 && <p>a more card style list of products</p>}
    </Card>
  );
}
