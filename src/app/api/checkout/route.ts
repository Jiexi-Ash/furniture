import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const convertToCents = (amount: number) => amount * 100

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


        // total amount of the cart
        const totalAmount = cart.items.reduce((acc, item) => {
            return acc + item.quantity * item.Product.price
        }, 0)


        let lineItems = []

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
        const subTotalAmount = totalAmount + discount + totalTaxAmount
        const amount = convertToCents(subTotalAmount)
        const orderKey = crypto.randomUUID()

        const headers = {
            "Authorization": `Bearer ${process.env.YOCO_SECRET_KEY}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Idempotency-Key": orderKey,
        }

        // create order
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                status: "PENDING",
                orderKey: orderKey,
                total: totalAmount,
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
            amount: amount,
            currency: process.env.PAYMENT_CURRENCY,
            lineItems: lineItems,
            totalDiscount: discount,
            totalTaxAmount: totalTaxAmount,
            subtotalAmount: subTotalAmount,
            cancelUrl: `${process.env.DOMAIN_URL}/checkout?cancel=1`,
            successUrl: `${process.env.DOMAIN_URL}/checkout?succes=1`,
            failureUrl: `${process.env.DOMAIN_URL}/checkout?failure=1`,
            metaData: {
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
        // return error message
        return NextResponse.json({
            error: "Something went wrong, please try again"
        })
    }

}