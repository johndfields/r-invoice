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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useClientStore } from "@/app/store/clientStore";
import { useState } from "react";

const formSchema: z.ZodType<Address> = z.object({
  name: z.string().min(1, {
    message: "Client name cannot be empty",
  }),
  street1: z.string().min(1, {
    message: "Street 1 cannot be empty",
  }),
  street2: z.string().optional(),
  city: z.string().min(1, {
    message: "City cannot be empty",
  }),
  state: z.string().min(1, {
    message: "State cannot be empty",
  }),
  zipcode: z.string().min(1, {
    message: "Zipcode cannot be empty",
  }),
  country: z.string().min(1, {
    message: "Country cannot be empty",
  }),
});

interface EditClientProps {
  client: Client;
}

export default function EditClient({ client }: EditClientProps) {
  const { toast } = useToast();
  const handleUpdateToClient = useClientStore((state) => state.update);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client.name,
      street1: client.street1,
      street2: client.street2 ? client.street2 : "",
      city: client.city,
      state: client.state,
      zipcode: client.zipcode,
      country: client.country,
    },
  });

  async function onSubmit(values: Address) {
    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          id: client.id,
          createdByUserId: client.createdByUserId,
          type: "client",
        }),
      });

      handleUpdateToClient({
        ...values,
        id: client.id,
        createdByUserId: client.createdByUserId,
        type: "client",
      });

      form.reset();

      toast({
        title: "Clients Updated",
        description: `Updated ${values.name}`,
      });

      setOpen(false);
    } catch {
      toast({
        title: "Unable to update client.",
        variant: "destructive",
      });
    }
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
              d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z"
              fill="currentColor"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogDescription>
            Edit your client and billable address.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 my-8 mx-auto flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme, Inc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street 1</FormLabel>
                  <FormControl>
                    <Input placeholder="123 W Street Rd" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street 2</FormLabel>
                  <FormControl>
                    <Input placeholder="PO 456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Brooklyn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="NY" {...field} maxLength={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="United States" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="ml-auto" type="submit">
              Update Client
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
