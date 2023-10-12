import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



const corsHeaders = {
    "Allow-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "content-Type, Authorization",
}
const postUrl = "https://payments.yoco.com/api/checkouts"

const convertToCents = (amount: number) => amount * 100

export async function OPTIONS() {
    return NextResponse.json({ headers: corsHeaders })
}

export async function POST(request: NextRequest) {
    const { productIds } = await request.json()
    const headers = {
        "Authorization": `Bearer ${process.env.YOCO_SECRET}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    const reponse = await axios.post(postUrl, {
        amount: convertToCents(1000),
        currency: "ZAR",
        cancelUrl: "https://4f93-102-182-46-145.ngrok-free.app/cancel",
        successUrl: "https://4f93-102-182-46-145.ngrok-free.app/success",

    }, { headers: headers })

    //   return to the client
    return NextResponse.json({
        url: reponse.data.redirectUrl,
        id: reponse.data.id,
    })
}