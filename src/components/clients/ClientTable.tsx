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
  const [clients, setClients] = useState<Client[]>([]);
  // const clients = useClientStore((state) => state.clients);

  const update = async () => {
    const res = await fetch("/api/clients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { addresses } = await res.json();

    setClients(addresses);
  };

  useEffect(() => {
    useClientStore.persist.rehydrate();
    update();
  }, []);

  return (
    <Card className="w-full my-8">
      {clients.length === 0 && (
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
