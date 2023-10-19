"use server"

import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import { addProductSchema, updateProductSchema } from "@/lib/validations";
import { ProductItems } from "@/types";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

import * as z from "zod";


export const getProducts = async (): Promise<ProductItems[]> => {
  const supabaseServer = await supabaseServerComponentClient();
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      Image: true,
      category: true
    },

  });


  const productItems = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      features: product.features,
      dimensions: product.dimensions,
      quantity: product.quantity,
      isActive: product.isActive,
      category: { name: product.category?.name as string, id: product.category?.id as string },
      images: product.Image,
    }
  });
  return productItems
};

export const getAllProducts = async (): Promise<ProductItems[]> => {
  const products = await prisma.product.findMany({
    include: {
      Image: true,
      category: true
    },

  });


  const productItems = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      features: product.features,
      dimensions: product.dimensions,
      quantity: product.quantity,
      isActive: product.isActive,
      category: { name: product.category?.name as string, id: product.category?.id as string },
      images: product.Image,
    }
  });
  return productItems
};

export const getProduct = async (id: number): Promise<ProductItems> => {
  if (!id || isNaN(id)) {
    throw new Error("Could not find product");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: id,
      isActive: true,

    },
    include: {
      Image: true,
      category: true
    },

  });

  if (!product) {
    throw new Error("Product not found");
  }

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    features: product.features,
    dimensions: product.dimensions,
    quantity: product.quantity,
    isActive: product.isActive,
    category: { name: product.category?.name as string, id: product.category?.id as string },
    images: product.Image,
  }
};

export const addProduct = async (product: z.infer<typeof addProductSchema>) => {
  const supabaseServer = await supabaseServerComponentClient();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) {
    throw new Error("You need to be signed in to perform this action");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });


  const isAdmin = getUser?.role === "ADMIN";

  if (!isAdmin) {
    throw new Error("You need to be an admin to perform this action");
  }

  const productWithSameName = await prisma.product.findFirst({
    where: {
      name: product.name
    }
  });

  if (productWithSameName) {
    throw new Error("Product with this name already exists");
  }

  const category = await prisma.category.findFirst({
    where: {
      name: product.category
    }
  });

  await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      features: product.features,
      dimensions: product.dimensions,
      quantity: product.quantity,
      category: {
        connectOrCreate: {
          create: {
            name: product.category,
          },
          where: {
            name: product.category,
          },
        },
      },
    },

  })


  revalidatePath("/dashboard/products");


}

export const uploadImages = async (imagePath: string, productId: number) => {
  const supabaseServer = await supabaseServerComponentClient();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) {
    throw new Error("You need to be signed in to perform this action");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });


  const isAdmin = getUser?.role === "ADMIN";

  if (!isAdmin) {
    throw new Error("You need to be an admin to perform this action");
  }

  if (!imagePath) {
    throw new Error("No images provided");
  }

  if (!productId) {
    throw new Error("No product id provided");
  }
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const { data } = supabaseServer.storage
    .from("products")
    .getPublicUrl(imagePath);

  if (!data) {
    throw new Error("No image found");
  }

  await prisma.image.create({
    data: {
      url: data.publicUrl,
      Product: {
        connect: {
          id: productId,
        },
      },
    },
  });

  revalidatePath("/dashboard/products");


};


export const updateActiveStatus = async (id: number, isActive: boolean) => {
  const supabaseServer = await supabaseServerComponentClient();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) {
    throw new Error("You need to be signed in to perform this action");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });


  const isAdmin = getUser?.role === "ADMIN";

  if (!isAdmin) {
    throw new Error("You need to be an admin to perform this action");
  }

  if (!id || isNaN(id)) {
    throw new Error("Could not find product");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      isActive: isActive,
    },
  });

  revalidatePath("/dashboard/products");
};

export const updateProduct = async (product: z.infer<typeof updateProductSchema>) => {
  const supabaseServer = await supabaseServerComponentClient();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) {
    throw new Error("You need to be signed in to perform this action");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  console.log(getUser);


  const isAdmin = getUser?.role === "ADMIN";

  if (!isAdmin) {
    throw new Error("You need to be an admin to perform this action");
  }

  if (!product) {
    throw new Error("No product provided");
  }
  if (!product.id || isNaN(product.id)) {
    throw new Error("No product id provided");
  }

  const getProduct = await prisma.product.findUnique({
    where: {
      id: product.id,
    },
  });

  if (!getProduct) {
    throw new Error("Product not found");
  }

  const category = await prisma.category.findFirst({
    where: {
      name: product.category.name
    }
  });

  await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      features: product.features,
      dimensions: product.dimensions,
      quantity: product.quantity,
      category: {
        connectOrCreate: {
          where: {
            id: category?.id,
            name: product.category.name,
          },
          create: {
            name: product.category.name,
          },
        },
      },
      isActive: product.isActive,
    },
  });

  revalidatePath("/dashboard/products");
}

export const deleteProduct = async (id: number) => {
  const supabaseServer = await supabaseServerComponentClient();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) {
    throw new Error("You need to be signed in to perform this action");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  const isAdmin = getUser?.role === "ADMIN";

  if (!isAdmin) {
    throw new Error("You need to be an admin to perform this action");
  }

   await prisma.product.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/dashboard/products");
}