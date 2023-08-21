import type { Product } from '@prisma/client';
import * as z from 'zod';


export const cartItemSchema = z.object({
    productId: z.number(),
    quantity: z.number()
})


export const deletCartItemSchema = z.object({
    productId: z.number()
})

export const increaseQuantitySchema = z.object({
    productId: z.number(),
    itemId: z.number()
})

export const decreaseQuantitySchema = z.object({
    productId: z.number(),
    itemId: z.number()
})
