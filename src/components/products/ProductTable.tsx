"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useProductStore } from "@/app/store/productStore";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

export function ProductTable() {
  const { products, setProducts } = useProductStore();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getClients() {
      setLoading(true);
      const res = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { products } = await res.json();

      setLoading(false);
      setProducts(products);
    }
    getClients();
  }, []);

  return (
    <div className="my-8 w-full">
      {isLoading && (
        <Card className="w-full my-8">
          <div className="p-4 w-full flex justify-center items-center">
            <Spinner />
          </div>
        </Card>
      )}

      {products.length === 0 && !isLoading && (
        <Card className="w-full my-8">
          {products.length === 0 && (
            <div className="p-4 text-center">
              <p>No products added yet</p>
            </div>
          )}
        </Card>
      )}

      {products.length > 0 && (
        <div className="flex gap-2 w-full justify-start">
          {products.map((product) => (
            <Card className="w-72" key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                ${product.rate.toFixed(2)}
                <p>{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
