import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";




const postUrl = "https://payments.yoco.com/api/checkouts"

const convertToCents = (amount: number) => amount * 100

export async function POST(request: NextRequest) {
    const supabase = await supabaseServerComponentClient()

    const { data: { user }, } = await supabase.auth.getUser()

    //    check if there is a user
    if (!user) {
        throw new Error("You must be logged in to make a payment")
    }

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

    console.log(cart)

    // check if there is a cart
    if (!cart) {
        throw new Error("Add items to cart to make a payment")
    }

    // compare cart items with product items and check if the product is still available
    const cartItems = cart.items.map(async (item) => {
        const isInStock = await prisma.product.findUnique({
            where: {
                id: item.productId
            },
        });

        if (!isInStock) {
            throw new Error("One or more products in cart are currently out of stock")
        }

        if (isInStock.quantity > item.quantity) {
            return item
        }
    })

    console.log(cartItems)

    // us reduce to calculate the total amount of the cart
    const totalAmount = cart.items.reduce((acc, item) => {
        return acc + item.quantity * item.Product.price
    }, 0)

    const orderKey = crypto.randomUUID()

    console.log(totalAmount)

    const headers = {
        "Authorization": `Bearer sk_test_a175633b5mm2Kv575704cf9911cd`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        // Idempotency-Key create uuid
        "Idempotency-Key": orderKey,
    }

    // create order
    const order = await prisma.order.create({
        data: {
            userId: user.id,
            status: "PENDING",
            orderKey: orderKey,
            total: totalAmount,
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

    const reponse = await axios.post(postUrl, {
        amount: convertToCents(totalAmount),
        currency: process.env.PAYMENT_CURRENCY,
        cancelUrl: `${process.env.DOMAIN_URL}/checkout?cancel=1`,
        successUrl: `${process.env.DOMAIN_URL}/checkout?succes=1`,

    }, { headers: headers })

    await prisma.cart.delete({
        where: {
            id: cart.id,
        },
    })
    //   return to the client
    return NextResponse.json({
        url: reponse.data.redirectUrl,
        id: reponse.data.id,
    })
}