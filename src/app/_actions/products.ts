"use server"

import {prisma} from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";


export const getProducts = async () => {
    const supabaseServer = await supabaseServerComponentClient();
    const products = await prisma.product.findMany();
    

    const productsWithImages = await Promise.all(
        products.map(async (product) => {
            const { data } =  supabaseServer.storage
                .from("products")
                .getPublicUrl(product.primaryImage);

            return { ...product, primaryImage: data.publicUrl };
        }
        )
    );

    return productsWithImages;
};