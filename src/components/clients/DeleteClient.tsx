"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";
import { useClientStore } from "@/app/store/clientStore";
import { useState } from "react";
import Spinner from "../Spinner";

interface DeleteClientProps {
  client: Client;
}

export default function DeleteClient({ client }: DeleteClientProps) {
  const { toast } = useToast();
  const handleDeleteClient = useClientStore((state) => state.delete);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);
    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: client.id,
        }),
      });

      handleDeleteClient(client);

      toast({
        title: "Clients Deleted",
        description: `Updated ${client.name}`,
      });

      setOpen(false);
    } catch {
      toast({
        title: "Unable to delete client.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" variant="ghost">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z"
              fill="currentColor"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Client</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the client?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between items-center">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={onSubmit} variant="destructive">
            {isLoading ? <Spinner color="white" /> : "Delete Client"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
