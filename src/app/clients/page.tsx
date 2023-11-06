"use client";

import { ClientTable } from "@/components/clients/ClientTable";
import NewClient from "@/components/clients/NewClient";
import { useState, useEffect } from "react";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    const clients = localStorage.getItem("clients");

    if (clients) {
      setClients(JSON.parse(clients));
    }
  }, []);

  const handleUpdatedClients = () => {
    const clients = localStorage.getItem("clients");

    if (clients) {
      setClients(JSON.parse(clients));
    }
  };

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl">Clients</h1>

        <NewClient updatedClients={handleUpdatedClients} />
      </div>

      <ClientTable clients={clients} updatedClients={handleUpdatedClients} />
    </>
  );
}
