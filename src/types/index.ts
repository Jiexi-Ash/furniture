import type { Category, Image, Product } from "@prisma/client";

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
        id: number;
        name: string;
    }

}