import { NextRequest, NextResponse } from "next/server";
import {headers} from "next/headers"
import * as crypto from "crypto"
import { prisma } from "@/lib/prisma";

const secret = process.env.YOCO_WEBHOOK_SECRET
export async function POST(req: NextRequest, res: NextResponse) {
     // get raw body
    const body = await req.text()
    const id = headers().get("webhook-id")
    const timestamp = headers().get("webhook-timestamp")

    //create signedContent
    const signedContent = `${id}.${timestamp}.${body}`

     // determine expected signature
    const secretBytes = new Buffer(secret.split('_')[1], "base64");

    const expectedSignature = crypto
    .createHmac('sha256', secretBytes)
    .update(signedContent)
    .digest('base64');

    // compare signatures

    const signature = headers().get('webhook-signature')?.split(' ')[0].split(',')[1]
    console.log(signature)
    if (crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature??""))) {
        const data = JSON.parse(body)
        console.log(data)

        // check if payment is successful
        if (data.type === "payment.succeeded") {
            console.log(data.payload.metadata.checkoutId)
            const order = await prisma.order.findUnique({
                where:{
                    id: data.payload.metadata.orderId
                }
            })

            // check if checkoutId matches
            if (order?.checkoutId === data.payload.metadata.checkoutId) {
                // update order
                await prisma.order.update({
                    where: {
                        id: order?.id
                    },
                    data: {
                        status: "PAYMENT_RECEIVED"
                    }
                })
            }
        }


        return new NextResponse(null, {status: 200})
    }

    // do not process webhook event
    return NextResponse.json({message: "not received"})
}