import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient  from "@/lib/supabaseServer";

type Params = {
    params: {
        id: string;
    };
};


export const GET = async (req:NextRequest, { params }:Params) => {
    const supabase = await supabaseServerComponentClient();
    const { id } = params;

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!product) {
            return new NextResponse("Product not found", { status: 404 });
        }

        const { data } = supabase.storage
            .from("products")
            .getPublicUrl(product.primaryImage);

        const productWithImage = { ...product, primaryImage: data.publicUrl };

        return NextResponse.json(productWithImage);

    }
    catch (error) {
        console.error(error);
        return new NextResponse("Something went wrong", { status: 500 });
    }
};