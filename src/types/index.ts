import type { category, Image, Product, Cart } from "@prisma/client";

type NavItem = {
    title: string;
    href: string;
}

export type mainNavItem = NavItem & {
    items?: NavItem[];
}

export interface CartItems extends Pick<Product, 'id' | 'name' | 'price' | 'quantity'  > {
    images: Image[];
    userQuantity?: number;
    itemId?: number;

}

export interface ProductItems extends Pick<Product, 'id' | 'name' | 'price' | 'quantity' | 'description' | 'dimensions' | 'features' | 'isActive'  > {
    images: Image[];
    category?: {
        id: string;
        name: string;
    }

}

export interface UserCart extends Pick<Cart, 'id' | 'userId' > {
    items: {
        id: number;
        productId: number;
        quantity: number;
    }[]
}

export type UserCartItem = {
        id: number;
        productId: number;
        quantity: number;
}
   
