"use client";
import React, { useTransition } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductItems } from "@/types";
import { Textarea } from "../ui/textarea";
import Loader from "../Loader";

import { Switch } from "@/components/ui/switch";
import { deleteProduct, updateProduct } from "@/app/_actions/products";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  price: z.coerce.number(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.object({ id: z.number(), name: z.string() }),
  quantity: z.coerce.number(),
  features: z.string().min(10, "Features must be at least 10 characters"),
  dimensions: z.string().min(10, "Dimensions must be at least 10 characters"),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  product: ProductItems;
}

function UpdateProduct({ product }: Props) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      description: product.description || "",
      category: product.category,
      quantity: product.quantity,
      features: product.features,
      dimensions: product.dimensions,
      isActive: product.isActive,
    },
  });

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteProduct(product.id);
        toast({
          description: "Product deleted successfully",
        });
      } catch (e) {
        toast({
          variant: "destructive",
          description: "error deleting product",
        });
      }
    });
  };

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        await updateProduct({ id: product.id, ...values });

        toast({
          description: "Product updated successfully",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Something went wrong, please try again",
        });
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                  {...field}
                />
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
                  placeholder=""
                  className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Price</FormLabel>
              <FormControl>
                <Input
                  className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product quantity</FormLabel>
              <FormControl>
                <Input
                  className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dimensions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dimensions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Is Product Active?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <Button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white"
            disabled={isPending}
          >
            {isPending ? <Loader /> : "Delete"}
          </Button>
          <Button
            type="submit"
            className="bg-primaryGreen text-white hover:bg-primaryGreen/60"
            disabled={isPending}
          >
            {isPending ? <Loader /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateProduct;
