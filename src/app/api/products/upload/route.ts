import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest) => {
    
  try {
    const supabase =  await supabaseServerComponentClient(); 
    const formData = await req.formData();

    const file = formData.get("file") as Blob | null;

    const fileName = `${randomUUID()}-${file?.name}`;

    const { error: uploadError, data } = await supabase.storage
    .from("products")
    .upload(fileName, file!);

    if (uploadError) {
        throw new Error(uploadError.message);
    }
      return  NextResponse.json({path: data.path});
    } catch (error) {
      return new NextResponse("Something went wrong", { status: 500 });
    }
  };