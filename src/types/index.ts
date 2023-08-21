import type { Product } from "@prisma/client";

type NavItem = {
    title: string;
    href: string;
}

export type mainNavItem = NavItem & {
    items?: NavItem[];
}

export interface CartItems extends Pick<Product, 'id' | 'name' | 'price' | 'quantity' | 'primaryImage'> {
    userQuantity?: number;

}