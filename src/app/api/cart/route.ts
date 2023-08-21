import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient  from "@/lib/supabaseServer";



export const POST = async (req:NextRequest) => {
    const supabase = await supabaseServerComponentClient();
    const body = await req.json();

    console.log(body);

    const ids = body.productIds 



    try {
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        if (!products) {
            return new NextResponse("No products found", { status: 404 });
        }

        const productsWithImages = await Promise.allSettled(
            products.map(async (product) => {
                const { data } = await supabase.storage
                    .from("products")
                    .getPublicUrl(product.primaryImage);

                return { ...product, primaryImage: data.publicUrl };
            })
        );

        const result = productsWithImages.filter((product) => product.status === "fulfilled").map((product) => product.value);
        console.log(result);

        return NextResponse.json(result);

    } catch (error) {
        console.error(error);
        return new NextResponse("Something went wrong", { status: 500 });
    }

};