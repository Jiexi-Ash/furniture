"use server";

import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import { addProductSchema, updateProductSchema } from "@/lib/validations";
import { ProductItems } from "@/types";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export const getOrders = async () => {
  const supabase = await supabaseServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      OrderItem: {
        include: {
          Product: true,
        },
      },
    },
  });

  if (!orders) {
    return null;
  }

  const ordersItems = orders.map((order) => {
    return {
      orderId: order.id,
      total: order.total,
      status: order.status,
      customer: user?.email!,
      orderDate: order.createdAt,
      items: order.OrderItem.map((item) => {
        return {
          name: item.Product.name,
          quantity: item.quantity,
        };
      }),
    };
  });

  return ordersItems;
};
