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

import { useClientStore } from "@/app/store/zustand";

export function ClientTable() {
  const { clients } = useClientStore();

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
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Street</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.name}>
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
