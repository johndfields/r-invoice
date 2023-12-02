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
import { useProductStore } from "@/app/store/productStore";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import Spinner from "../Spinner";

const formSchema: z.ZodType<Product> = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Product name cannot be empty",
  }),
  rate: z.coerce.number().min(1, {
    message: "Product rate cannot be empty",
  }),
  description: z.string().min(1, {
    message: "Product description cannot be empty",
  }),
});

export default function NewProduct() {
  const { toast } = useToast();
  const handleAddToProducts = useProductStore((state) => state.add);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      rate: 0,
      description: "",
    },
  });

  async function onSubmit(values: Product) {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          createdByUserId: "d774bba0-0f8d-4e5d-a06c-1f287d226078",
        }),
      });

      const { product } = await res.json();

      handleAddToProducts(product);

      form.reset();

      toast({
        title: "Products Updated",
        description: `Added ${values.name}`,
      });

      setOpen(false);
    } catch {
      toast({
        title: "Unable to add product.",
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
          New Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
          <DialogDescription>Add a new product.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 my-8 mx-auto flex w-4/5 flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Laptop" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate</FormLabel>
                  <FormControl>
                    <Input placeholder="100.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A newly issued Dell XPS"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="ml-auto" type="submit">
              {isLoading ? <Spinner color="white" /> : "Add Product"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
