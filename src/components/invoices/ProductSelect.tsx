"use client";

import { useProductStore } from "@/app/store/productStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import Spinner from "../Spinner";

export default function ProductSelect() {
  const { products, setProducts } = useProductStore();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getProducts() {
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
    getProducts();
  }, []);

  const [chosenProduct, setChosenProduct] = useState<Product>();

  const handleProductSelected = (productName: string) => {
    setChosenProduct(products.find((product) => product.name === productName));
  };

  return (
    <main className="flex flex-col items-start p-4">
      <p>Choose Product</p>
      <Select
        onValueChange={(productName: string) =>
          handleProductSelected(productName)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select product" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Products</SelectLabel>
            {isLoading && (
              <div className="p-4 w-full flex justify-center items-center">
                <Spinner />
              </div>
            )}

            {products.length === 0 && !isLoading && (
              <div className="p-4 text-center">
                <p>No products added yet</p>
              </div>
            )}

            {products.map((product: Product) => (
              <SelectItem key={product.id} value={product.name}>
                {product.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </main>
  );
}
