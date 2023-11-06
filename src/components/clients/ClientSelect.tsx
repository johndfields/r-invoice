"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

interface Client {
  name: string;
  address: string;
}

export default function ClientSelect() {
  const [chosenClient, setChosenClient] = useState<Client | undefined>({
    name: "",
    address: "",
  });
  const clients: Client[] = [{ name: "FCG", address: "123" }];

  const handleClientSelected = (clientName: string) => {
    setChosenClient(clients.find((client) => client.name === clientName));
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-4">
      <p>Choose Client</p>
      <Select
        onValueChange={(clientName: string) => handleClientSelected(clientName)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select client" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Clients</SelectLabel>
            {clients.map((client: Client) => (
              <SelectItem key={client.name} value={client.name}>
                {client.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </main>
  );
}
