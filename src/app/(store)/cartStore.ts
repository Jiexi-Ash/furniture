import {create} from 'zustand';
import axios from 'axios';
import { Product } from '@prisma/client';

type cartItem = {
    id: number;
    quantity: number;
};

interface CartStore {
    isLoading: boolean;
    cart: cartItem[];
    totalItems: number;
    addToCart: (id:number, quantity:number) => void;
    removeFromCart: (product: any) => void;
    clearCart: () => void;
    setCart: (cart: Product[]) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    checkout: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
    isLoading: false,
    cart: [],
    totalItems: 0,
    addToCart: async (id, quantity) => {},
    removeFromCart: (product) => {},
    clearCart: () => {},
    setCart: (cart) => {},
    increaseQuantity: (id) => {},
    decreaseQuantity: (id) => {},
    checkout: () => {},
}));