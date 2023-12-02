"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import Spinner from "../Spinner";

const formSchema: z.ZodType<Address> = z.object({
  name: z.string().min(1, {
    message: "Client Name cannot be empty",
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

export default function NewClient() {
  const { toast } = useToast();
  const handleAddToClients = useClientStore((state) => state.add);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
  });

  async function onSubmit(values: Address) {
    setLoading(true);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          createdByUserId: "d774bba0-0f8d-4e5d-a06c-1f287d226078",
          type: "client",
        }),
      });

      const { client } = await res.json();

      handleAddToClients(client);

      form.reset();

      toast({
        title: "Client Updated",
        description: `Added ${values.name}`,
      });

      setOpen(false);
    } catch {
      toast({
        title: "Unable to add client.",
        variant: "destructive",
      });
    }

    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z"
              fill="#ffffff"
            />
          </svg>
          New Client
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Client</DialogTitle>
          <DialogDescription>
            Add a new client and billable address.
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
              {isLoading ? <Spinner color="white" /> : "Add Client"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
