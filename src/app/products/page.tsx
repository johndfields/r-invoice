import { ProductTable } from "@/components/products/ProductTable";
import NewProduct from "@/components/products/NewProduct";

export default function Products() {
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl">Products</h1>

        <NewProduct />
      </div>

      <ProductTable />
    </>
  );
}
