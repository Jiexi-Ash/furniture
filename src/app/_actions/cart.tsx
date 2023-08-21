"use server";
import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import type {
  cartItemSchema,
  decreaseQuantitySchema,
  deletCartItemSchema,
  increaseQuantitySchema,
} from "@/lib/validations";
import type { CartItems } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { type z } from "zod";

export const addToCart = async (
  productDetails: z.infer<typeof cartItemSchema>
) => {
  const cookieList = cookies();

  const cartId = cookieList.get("cartId")?.value;

  if (!cartId) {
    const cart = await prisma.cart.create({
      data: {
        items: {
          create: {
            quantity: productDetails.quantity,
            Product: {
              connect: {
                id: productDetails.productId,
              },
            },
          },
        },
      },
    });

    cookieList.set("cartId", cart.id);

    revalidatePath("/");
    return;
  }

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      items: true,
    },
  });

  if (!cart) {
    cookieList.set({
      name: "cartId",
      value: "",
      expires: new Date(0),
    });

    throw new Error("Cart not found");
  }

  const cartItem = cart.items.find(
    (item) => item.productId === productDetails.productId
  );

  if (cartItem) {
    cartItem.quantity += productDetails.quantity;

    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          update: {
            where: {
              id: cartItem.id,
            },
            data: {
              quantity: cartItem.quantity,
            },
          },
        },
      },
    });
  } else {
    //  update cart and add item
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          create: {
            quantity: productDetails.quantity,
            Product: {
              connect: {
                id: productDetails.productId,
              },
            },
          },
        },
      },
    });
  }

  revalidatePath("/");
};

export async function getCartItems(): Promise<CartItems[]> {
  const supabase = await supabaseServerComponentClient();
  const cookieList = cookies();

  const cartId = cookieList.get("cartId")?.value;

  if (!cartId) {
    return [];
  }

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      items: {
        include: {
          Product: true,
        },
      },
    },
  });

  if (!cart) return [];

  const cartItemsWithImage = await Promise.all(
    cart.items.map(async (item) => {
      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(item.Product.primaryImage);

      return {
        ...item,
        Product: { ...item.Product, primaryImage: data.publicUrl },
      };
    })
  );

  //  get product and quantity
  const cartItems = cartItemsWithImage.map((item) => ({
    itemId: item.id,
    id: item.Product.id,
    userQuantity: item.quantity,
    quantity: item.Product.quantity,
    name: item.Product.name,
    price: item.Product.price,
    primaryImage: item.Product.primaryImage,
  }));

  return cartItems;
}

export const deleteCartItem = async (
  input: z.infer<typeof deletCartItemSchema>
) => {
  const cookieList = cookies();

  const cartId = cookieList.get("cartId")?.value;

  if (!cartId) {
    throw new Error("Cart not found");
  }

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      items: true,
    },
  });

  if (!cart) return;

  cart.items =
    cart.items.filter(
      (item) => Number(item.productId) !== Number(input.productId)
    ) ?? [];

  //  delete cart item
  await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      items: {
        deleteMany: {
          productId: Number(input.productId),
        },
      },
    },
  });

  revalidatePath("/");
};

export const incrementCartItem = async (
  input: z.infer<typeof increaseQuantitySchema>
) => {
  const cookieList = cookies();
  const cartId = cookieList.get("cartId")?.value;

  if (!cartId) {
    throw new Error("Cart not found");
  }

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      items: true,
    },
  });

  if (!cart) return;

  await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      items: {
        update: {
          where: {
            id: Number(input.itemId),
            productId: Number(input.productId),
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        },
      },
    },
  });

  revalidatePath("/");
};

export const decreaseCartItem = async (
  input: z.infer<typeof decreaseQuantitySchema>
) => {
  const cookieList = cookies();
  const cartId = cookieList.get("cartId")?.value;

  if (!cartId) {
    throw new Error("Cart not found");
  }

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      items: true,
    },
  });

  if (!cart) return;

  //  get cart item from product id
  const product = await prisma.product.findUnique({
    where: {
      id: Number(input.productId),
    },
  });

  if (!product) return;

  if (product.quantity === 0) {
    throw new Error("Product out of stock");
  }

  // get the cart item
  const cartItem = cart.items.find(
    (item) => Number(item.productId) === Number(input.productId)
  );

  // if cart item quantity is 1 delete cart item
  if (cartItem?.quantity === 1) return await deleteCartItem(input);

  //  decrease cart item quantity
  await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      items: {
        update: {
          where: {
            id: Number(input.itemId),
            productId: Number(input.productId),
          },
          data: {
            quantity: {
              decrement: 1,
            },
          },
        },
      },
    },
  });

  revalidatePath("/");
};
