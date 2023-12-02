"use client";

import { useClientStore } from "@/app/store/clientStore";
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

export default function ClientSelect() {
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

  const [chosenClient, setChosenClient] = useState<Client>();

  const handleClientSelected = (clientName: string) => {
    setChosenClient(clients.find((client) => client.name === clientName));
  };

  return (
    <main className="flex flex-col items-start p-4">
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
            {isLoading && (
              <div className="p-4 w-full flex justify-center items-center">
                <Spinner />
              </div>
            )}

            {clients.length === 0 && !isLoading && (
              <div className="p-4 text-center">
                <p>No clients added yet</p>
              </div>
            )}

            {clients.map((client: Client) => (
              <SelectItem key={client.id} value={client.name}>
                {client.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </main>
  );
}
