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
import { useToast } from "../ui/use-toast";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "../ui/select";
import { addShippingAddress } from "@/app/_actions/user";

enum Province {
  Gauteng = "Gauteng",
  WesternCape = "Western Cape",
  EasternCape = "Eastern Cape",
  KwaZuluNatal = "KwaZulu Natal",
  Limpopo = "Limpopo",
  Mpumalanga = "Mpumalanga",
  NorthWest = "North West",
  FreeState = "Free State",
  NorthernCape = "Northern Cape",
}

const formSchema = z.object({
  country: z.string().min(3, "Country must be at least 3 characters long"),
  firstName: z.string().min(3, "First Name must be at least 3 characters long"),
  lastName: z.string().min(3, "Last Name must be at least 3 characters long"),
  address: z.string().min(3, "Address must be at least 3 characters long"),
  complexOrApartment: z.string().optional(),
  city: z.string().min(3, "City must be at least 3 characters long"),
  province: z.string().min(3, "Province must be at least 3 characters long"),
  postalCode: z.coerce.number().min(4, "Postal Code must be 4 digits long"),
  phoneNumber: z.coerce.number(),
});

function ShippingDetails() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "South Africa",
      firstName: "",
      lastName: "",
      address: "",
      complexOrApartment: "test",
      city: "",
      province: "Gauteng",
      postalCode: 0,
      phoneNumber: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const {
      country,
      firstName,
      lastName,
      address,
      complexOrApartment,
      city,
      province,
      postalCode,
      phoneNumber,
    } = values;

    startTransition(async () => {
      try {
        await addShippingAddress({
          country,
          firstName,
          lastName,
          address,
          complexOrApartment: complexOrApartment ?? "",
          city,
          province,
          postCode: postalCode,
          phone: phoneNumber,
        });

        toast({
          title: "Success",
          description: "Shipping address added successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: error.message,
        });
      }
    });
  };
  return (
    <div className="px-6 py-6">
      <h2 className="text-xl py-6">Shipping Details</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 overflow-auto "
        >
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                    placeholder="Country"
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                    placeholder="Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complexOrApartment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                    placeholder="Complex or Apartment"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                      placeholder="City"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="text-red-500"
                          placeholder="Province"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Gauteng">Gauteng</SelectItem>
                      <SelectItem value="Western Cape">Western Cape</SelectItem>
                      <SelectItem value="Eastern Cape">Eastern Cape</SelectItem>
                      <SelectItem value="KwaZulu Natal">
                        KwaZulu Natal
                      </SelectItem>
                      <SelectItem value="Limpopo">Limpopo</SelectItem>
                      <SelectItem value="Mpumalanga">Mpumalanga</SelectItem>
                      <SelectItem value="North West">North West</SelectItem>
                      <SelectItem value="Free State">Free State</SelectItem>
                      <SelectItem value="Northern Cape">
                        Northern Cape
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-gray-200 focus:ring-0 focus-visible:ring-0  focus:outline-none focus:border-gray-400"
                      placeholder="Postal Code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="bg-primaryGreen text-white hover:bg-primaryGreen/60"
            disabled={isPending}
          >
            {isPending ? <Loader /> : "Pay Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ShippingDetails;
