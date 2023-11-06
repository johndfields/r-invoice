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

interface NewClientProps {
  updatedClients: () => void;
  client: Client;
}

export default function EditClient({ updatedClients, client }: NewClientProps) {
  const { toast } = useToast();

  function onSubmit() {
    console.log("g");

    const storedClients = localStorage.getItem("clients");

    const storedClientsParsed: Client[] = JSON.parse(storedClients!);

    let foundIndex = storedClientsParsed.findIndex(
      (cl) => cl.name === client.name
    );

    if (storedClientsParsed.length > 1) {
      const newClients = [
        ...storedClientsParsed.slice(0, foundIndex),
        ...storedClientsParsed.splice(foundIndex + 1),
      ];

      localStorage.setItem("clients", JSON.stringify(newClients));
    } else {
      localStorage.setItem("clients", JSON.stringify([]));
    }

    toast({
      title: "Client Deleted",
      description: `Removed ${client.name}`,
    });

    updatedClients();
  }

  return (
    <Dialog>
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
          <DialogClose asChild>
            <Button onClick={onSubmit} variant="destructive">
              Delete Client
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
