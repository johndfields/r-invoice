import { ClientTable } from "@/components/clients/ClientTable";
import NewClient from "@/components/clients/NewClient";

export default function Clients() {
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl">Clients</h1>

        <NewClient />
      </div>

      <ClientTable />
    </>
  );
}
