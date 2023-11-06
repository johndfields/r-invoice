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

import { useEffect, useState } from "react";

export default function ClientSelect() {
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    const clients = localStorage.getItem("clients");

    if (clients) {
      setClients(JSON.parse(clients));
    }
  }, []);

  const [chosenClient, setChosenClient] = useState<Client>();

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
