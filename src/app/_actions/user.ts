"use server";
import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import type {
  cartItemSchema,
  decreaseQuantitySchema,
  deletCartItemSchema,
  increaseQuantitySchema,
  shippingSchema,
} from "@/lib/validations";
import type { CartItems, UserCart, UserCartItem } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { type z } from "zod";

export const addShippingAddress = async (shippingDetails:z.infer<typeof shippingSchema>) => {
    const supabase = await supabaseServerComponentClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("You must be logged in to perform this action");
    }

    if (!shippingDetails) {
      throw new Error("Please provide shipping details");
    }

    await prisma.shipping.create({
        data: {
            address: shippingDetails.address,
            city: shippingDetails.city,
            complexOrApartment: shippingDetails.complexOrApartment,
            country: shippingDetails.country,
            firstName: shippingDetails.firstName,
            lastName: shippingDetails.lastName,
            phone: shippingDetails.phone,
            postcode: shippingDetails.postCode,
            province: shippingDetails.province,
            user: {
            connect: {
                id: user.id,
            },
            },
        },
    });

    revalidatePath("/");
}  

export const getShippingAddress = async () => {
  const supabase = await supabaseServerComponentClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("You must be logged in to perform this action");
    }

    const getUser = await prisma.user.findUnique({where: {id: user.id}});

    if (!getUser) {
      throw new Error("User not found");
    }

    const shippingDetails = await prisma.shipping.findFirst({
      where: {
        userId: getUser.id,
      },
    });

    if (!shippingDetails) {
      return null;
    }

    return shippingDetails;
};