import { calculateShippingCost } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import { LineItems } from "@/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const convertToCents = (amount: number) => amount * 100
const convertToRand = (amount: number) => amount / 100

export async function POST(request: NextRequest) {

    try {
        const supabase = await supabaseServerComponentClient()

        const { data: { user }, } = await supabase.auth.getUser()

        //    check if there is a user
        if (!user) {
            throw new Error("You must be logged in to make a payment")
        }

        const shppingDetails = await prisma.shipping.findFirst({
            where: {
                userId: user.id,
            },
        })

        if (!shppingDetails) {
            throw new Error("Please provide shipping details")
        }

        // get the cart
        const cart = await prisma.cart.findFirst({
            where: {
                userId: user.id,
            },
            include: {
                items: {
                    include: {
                        Product: true,
                    },
                },
            },
        })

        // check if there is a cart
        if (!cart) {
            throw new Error("Add items to cart to make a payment")
        }

        // compare cart items with product items and check if the product is still available
        for (const item of cart.items) {
            const product = await prisma.product.findUnique({
                where: {
                    id: item.productId,
                },
            })

            if (!product) {
                throw new Error(`Sorry, ${item.Product.name} is not available at the moment`)
            }

            if (product?.quantity! < item.quantity) {
                throw new Error(`Sorry, ${item.Product.name} is out of stock`)
                
            }
        }


        // total amount of the cart
        const totalAmount = cart.items.reduce((acc, item) => {
            return acc + item.quantity * item.Product.price
        }, 0)


        let lineItems: LineItems[] = []

        cart.items.forEach((item) => {
            lineItems.push({
                displayName: item.Product.name,
                quantity: item.quantity,
                pricingDetails: {
                    price: convertToCents(item.Product.price),
                },
            })
        })

        // setup headers and data for the request
        const discount = 0
        const totalTaxAmount = totalAmount * 0.15
        const shippingFee = calculateShippingCost(totalAmount, shppingDetails.province) ?? 0
        const subTotalAmount = totalAmount + discount + totalTaxAmount + shippingFee
        const amountToBePayed = convertToCents(subTotalAmount)
        const orderKey = crypto.randomUUID()
        

        const headers = {
            "Authorization": `Bearer ${process.env.YOCO_SECRET_KEY}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Idempotency-Key": orderKey,
        }

        // create order
        const amountInRands = convertToRand(amountToBePayed)
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                status: "PENDING",
                orderKey: orderKey,
                total: amountInRands,
                shipping: {
                    connect: {
                        id: shppingDetails.id,
                    },
                },
                OrderItem: {
                    //    connect to product
                    create: cart.items.map((item) => ({
                        quantity: item.quantity,
                        Product: {
                            connect: {
                                id: item.productId,
                            },
                        },
                    })),
                },
            },
        })


        const reponse = await axios.post(`${process.env.YOCO_URL}`, {
            amount: amountToBePayed,
            currency: process.env.PAYMENT_CURRENCY,
            lineItems: lineItems,
            totalDiscount: discount,
            totalTaxAmount: totalTaxAmount,
            subtotalAmount: subTotalAmount,
            cancelUrl: `${process.env.DOMAIN_URL}/orders?cancel=1`,
            successUrl: `${process.env.DOMAIN_URL}/orders?succes=1`,
            failureUrl: `${process.env.DOMAIN_URL}/orders?failure=1`,
            metadata: {
                orderId: order.id,
            },

        }, { headers: headers })

        // update the order and log checkoutId
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                checkoutId: reponse.data.metadata.checkoutId,
            },
        })

        // delete cart
        await prisma.cart.delete({
            where: {
                id: cart.id,
            },
        })

        return NextResponse.json({
            url: reponse.data.redirectUrl,
            id: reponse.data.id,
        })
    } catch (error) {
        // @ts-ignore
        return  NextResponse.json({ message: error.message }, { status: 500 })
    }

}