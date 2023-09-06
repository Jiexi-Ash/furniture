"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { startTransition, useTransition } from "react";
import { addProduct } from "@/app/_actions/products";
import { Loader } from "lucide-react";
import { Sub } from "@radix-ui/react-navigation-menu";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  price: z.coerce.number(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  quantity: z.coerce.number(),
  features: z.string().min(10, "Features must be at least 10 characters"),
  dimensions: z.string().min(10, "Dimensions must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

function AddProduct() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      quantity: 0,
      features: "",
      dimensions: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        await addProduct(values);
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Something went wrong, please try again",
        });
      }
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primaryGreen text-white">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto max-h-[700px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 overflow-auto "
          >
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
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
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                      type="number"
                      {...field}
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
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                      type="number"
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
            <DialogFooter>
              <Button
                className="bg-primaryGreen text-white hover:bg-primaryGreen/60"
                disabled={isPending}
              >
                {isPending ? <Loader /> : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProduct;
