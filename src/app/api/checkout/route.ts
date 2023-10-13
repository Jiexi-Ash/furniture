import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";




const postUrl = "https://payments.yoco.com/api/checkouts"

const convertToCents = (amount: number) => amount * 100

export async function POST(request: NextRequest) {
    const { productIds } = await request.json()

    
    const headers = {
        "Authorization": `Bearer sk_test_a175633b5mm2Kv575704cf9911cd`,
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