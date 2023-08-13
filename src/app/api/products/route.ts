import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabaseServer";



export const GET = async (req:NextRequest) => {
    try {
        const products = await prisma.product.findMany();
        // for each product, get the public url from supabase
        const productsWithImages = await Promise.all(
            products.map(async (product) => {
                const { data } =  supabase.storage
                    .from("products")
                    .getPublicUrl(product.primaryImage);
                
                return { ...product, primaryImage: data.publicUrl };
            })
        );
        console.log(productsWithImages);
        return NextResponse.json(productsWithImages);
   
    } catch (error) {
        console.error(error);
        return new NextResponse("Something went wrong", { status: 500 });
    }
};

export const POST = async (req:NextRequest) => {
  const body = await req.json();

  const { name, description, price, primaryImage, quantity, features, dimensions } = body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        primaryImage,
        quantity,
        features,
        dimensions,
        updatedAt: new Date(),
      },
    });

    console.log(product);

    return new NextResponse("Product created successfully", {status: 201});
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};