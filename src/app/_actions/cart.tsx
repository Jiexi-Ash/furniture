"use server";
import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import type {
  cartItemSchema,
  decreaseQuantitySchema,
  deletCartItemSchema,
  increaseQuantitySchema,
} from "@/lib/validations";
import type { CartItems, UserCart, UserCartItem } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { type z } from "zod";

export const addToCart = async (
  productDetails: z.infer<typeof cartItemSchema>
) => {
  const cart = (await getCart()) ?? (await createCart());

  console.log(cart);

  const cartItem = cart.items.find(
    (item) => item.id === productDetails.productId
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
  const cookieList = cookies();
  const supabase = await supabaseServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let cart = null;

  if (user) {
    // find user cart
    cart = await prisma.cart.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        items: {
          include: {
            Product: {
              include: {
                Image: true,
              },
            },
          },
        },
      },
    });
  } else {
    const cartId = cookieList.get("cartId")?.value;

    cart = cartId
      ? await prisma.cart.findUnique({
          where: {
            id: cartId,
          },
          include: {
            items: {
              include: {
                Product: {
                  include: {
                    Image: true,
                  },
                },
              },
            },
          },
        })
      : null;

    if (!cart) return [];
  }

  //  get product and quantity

  if (!cart) return [];

  const cartItems = cart.items.map((item) => ({
    itemId: item.id,
    id: item.Product.id,
    userQuantity: item.quantity,
    quantity: item.Product.quantity,
    name: item.Product.name,
    price: item.Product.price,
    images: item.Product.Image,
  }));

  return cartItems;
}

export const deleteCartItem = async (
  input: z.infer<typeof deletCartItemSchema>
) => {
  console.log("deleting cart item");
  const supabase = await supabaseServerComponentClient();
  const cookieList = cookies();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const cart = await getCart();

    cart?.items.filter(
      (item) => Number(item.productId) !== Number(input.productId)
    );

    //  delete cart item

    await prisma.cart.update({
      where: {
        id: cart?.id,
      },
      data: {
        items: {
          deleteMany: {
            productId: Number(input.productId),
          },
        },
      },
    });
  } else {
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
  }

  revalidatePath("/");
};

export const incrementCartItem = async (
  input: z.infer<typeof increaseQuantitySchema>
) => {
  console.log("deleting cart item");
  const supabase = await supabaseServerComponentClient();
  const cookieList = cookies();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const cart = await getCart();
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

    // increase cart item quantity if product quantity is greater than cart item quantity

    if (cartItem?.quantity === product.quantity) return;

    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          update: {
            where: {
              id: cartItem?.id,
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
  } else {
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

    // increase cart item quantity if product quantity is greater than cart item quantity

    if (cartItem?.quantity === product.quantity) return;

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
  }

  revalidatePath("/");
};

export const decreaseCartItem = async (
  input: z.infer<typeof decreaseQuantitySchema>
) => {
  console.log("deleting cart item");
  const supabase = await supabaseServerComponentClient();
  const cookieList = cookies();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    console.log("user");
    const cart = await getCart();
    console.log(cart);
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

    // increase cart item quantity if product quantity is greater than cart item quantity

    if (cartItem?.quantity === product.quantity) return;

    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          update: {
            where: {
              id: cartItem?.id,
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
  } else {
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

    // increase cart item quantity if product quantity is greater than cart item quantity

    if (cartItem?.quantity === product.quantity) return;

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
  }

  revalidatePath("/");
};

export const createCart = async () => {
  console.log("creating cart");
  const supabase = await supabaseServerComponentClient();
  const cookieList = cookies();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const cart = await prisma.cart.create({
      data: {
        userId: user.id,
      },
      include: {
        items: true,
      },
    });

    const cartItems = cart?.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
    }));

    return {
      id: cart?.id ?? "",
      userId: cart?.userId ?? "",
      items: cartItems ?? [],
    };
  } else {
    const cart = await prisma.cart.create({
      data: {},
      include: {
        items: true,
      },
    });
    cookieList.set("cartId", cart.id);

    const cartItems = cart?.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
    }));

    return {
      id: cart?.id ?? "",
      userId: cart?.userId ?? "",
      items: cartItems ?? [],
    };
  }
};

export const getCart = async (): Promise<UserCart | null> => {
  console.log("getting cart");
  const supabase = await supabaseServerComponentClient();
  const cookieList = cookies();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        items: true,
      },
    });

    if (cart) {
      const cartItems = cart?.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
      }));

      return {
        id: cart?.id ?? "",
        userId: cart?.userId ?? "",
        items: cartItems ?? [],
      };
    }
    return null;
  } else {
    const cartId = cookieList.get("cartId")?.value;

    const cart = cartId
      ? await prisma.cart.findUnique({
          where: {
            id: cartId,
          },
          include: {
            items: true,
          },
        })
      : null;

    if (!cart) return null;

    const cartItems = cart?.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
    }));

    return {
      id: cart?.id ?? "",
      userId: cart?.userId ?? "",
      items: cartItems ?? [],
    };
  }
};

export const mergeCartToUser = async (userId: string) => {
  const cookieList = cookies();
  const localCartId = cookieList.get("cartId")?.value;

  if (!localCartId) return;

  const localCart = await prisma.cart.findUnique({
    where: {
      id: localCartId,
    },
    include: { items: true },
  });

  if (!localCart) return;

  const userCart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: { items: true },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      console.log(userCart);
      const mergedCartItems = mergeCartItems(localCart, userCart).map(
        (item: UserCartItem) => ({
          productId: item.productId,
          quantity: item.quantity,
        })
      );
      console.log(mergedCartItems);

      // delete the current cartItems
      await tx.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });

      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    // delete local cart
    await tx.cart.delete({
      where: {
        id: localCart.id,
      },
    });

    cookieList.set("cartId", "");
  });
};

const mergeCartItems = (localCart: UserCart, userCart: UserCart) => {
  const localCartItems = localCart.items;
  const userCartItems = userCart.items;
  console.log(localCartItems);
  console.log(userCartItems);

  localCartItems.forEach((localCartItem) => {
    const userCartItem = userCartItems.find(
      (item) => item.productId === localCartItem.productId
    );

    if (userCartItem) {
      userCartItem.quantity += localCartItem.quantity;
    } else {
      userCartItems.push(localCartItem);
    }
  });

  console.log(userCartItems);

  return userCartItems;
};
