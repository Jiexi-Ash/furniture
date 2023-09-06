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

export const addProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
   category: z.string(),
   features: z.string(),
   dimensions: z.string(),
   quantity: z.number(),
})

export const updateProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.object({id: z.number(), name: z.string()}),
    features: z.string(),
    dimensions: z.string(),
    quantity: z.number(),
    isActive: z.boolean(),
})
