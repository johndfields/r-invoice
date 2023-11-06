"use client";

import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl">Invoices</h1>
        <Link
          href={"/new-invoice"}
          className="ml-auto gap-2 rounded-md text-sm inline-flex items-center justify-center font-medium px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z"
              fill="#ffffff"
            />
          </svg>
          Create Invoice
        </Link>
      </div>
      <InvoiceTable />
    </>
  );
}
