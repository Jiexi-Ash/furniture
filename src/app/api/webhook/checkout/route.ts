import { NextRequest, NextResponse } from "next/server";
import {headers} from "next/headers"
import * as crypto from "crypto"

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
        const payload = JSON.parse(body)
        console.log(payload)

        console.log("match")


        return NextResponse.json({message: "received"})
    }

    // do not process webhook event
    return NextResponse.json({message: "not received"})
}