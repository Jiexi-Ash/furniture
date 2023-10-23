import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers"
import * as crypto from "crypto"
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
    // get raw body
    const body = await req.text()
    const id = headers().get("webhook-id")
    const timestamp = headers().get("webhook-timestamp")

    //create signedContent
    const signedContent = `${id}.${timestamp}.${body}`

    // determine expected signature
    const secretBytes = new Buffer(process.env.YOCO_WEBHOOK_SECRET!.split('_')[1], "base64");

    const expectedSignature = crypto
        .createHmac('sha256', secretBytes)
        .update(signedContent)
        .digest('base64');

    // compare signatures

    const signature = headers().get('webhook-signature')?.split(' ')[0].split(',')[1]
    if (crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature ?? ""))) {
        const data = JSON.parse(body)

        // check if payment is successful
        if (data.type === "payment.succeeded") {
            const order = await prisma.order.findUnique({
                where: {
                    id: data.payload.metadata.orderId
                }
            })

            // check if checkoutId matches
            if (order?.checkoutId === data.payload.metadata.checkoutId) {
                const orderItems = await prisma.orderItem.findMany({
                    where: {
                        orderId: order?.id
                    }
                })

                // update product quantity

                for (const item of orderItems) {
                    const product = await prisma.product.findUnique({
                        where: {
                            id: item.productId
                        }
                    })

                    await prisma.product.update({
                        where: {
                            id: product?.id
                        },
                        data: {
                            quantity: product?.quantity! - item.quantity
                        }
                    })
                }

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


        return new NextResponse(null, { status: 200 })
    }

    // do not process webhook event
    return NextResponse.json({ message: "not received" })
}