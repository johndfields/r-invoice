"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditClient from "./EditClient";
import DeleteClient from "./DeleteClient";

import { useClientStore } from "@/app/store/clientStore";
import { useEffect, useState } from "react";

export function ClientTable() {
  const { clients, setClients } = useClientStore();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getClients() {
      setLoading(true);
      const res = await fetch("/api/clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { addresses } = await res.json();

      setLoading(false);
      setClients(addresses);
    }
    getClients();
  }, []);

  return (
    <Card className="w-full my-8">
      {isLoading && (
        <div className="p-4 w-full flex justify-center items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {clients.length === 0 && !isLoading && (
        <div className="p-4 text-center">
          <p>No clients added yet</p>
        </div>
      )}

      {clients.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Street</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.street1}</TableCell>
                <TableCell>{client.city}</TableCell>
                <TableCell>{client.state}</TableCell>
                <TableCell className="flex gap-4 justify-end items-center">
                  <EditClient client={client} />
                  <DeleteClient client={client} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
