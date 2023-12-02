"use client";

import { useRouter } from "next/navigation";

import ClientSelect from "@/components/invoices/ClientSelect";
import ProductSelect from "@/components/invoices/ProductSelect";

export default function NewInvoice() {
  const router = useRouter();

  return (
    <div>
      <div className="flex gap-5 items-center">
        <svg
          onClick={() => {
            router.back();
          }}
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path
            d="M10.295 19.716a1 1 0 0 0 1.404-1.425l-5.37-5.29h13.67a1 1 0 1 0 0-2H6.336L11.7 5.714a1 1 0 0 0-1.404-1.424l-6.924 6.822a1.25 1.25 0 0 0 0 1.78l6.924 6.823Z"
            fill="currentColor"
          />
        </svg>
        <h1 className="text-3xl">Products</h1>
      </div>
      <ClientSelect />
      <ProductSelect />
    </div>
  );
}
