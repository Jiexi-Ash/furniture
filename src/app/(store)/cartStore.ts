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
    addToCart: async (id, quantity) => {
        set({ isLoading: true });
        try {
            const {data} = await axios.get(`/api/products/${id}`);

            if (!data) throw new Error("Product not found");

            if (quantity > data.quantity) throw new Error("Not enough stock");

            set((state) => {
                const newCart = [...state.cart, {id, quantity}];
                localStorage.setItem("cart", JSON.stringify(newCart));
                return { cart: newCart, totalItems: newCart.length };
            });
        } catch (error) {
            console.error(error);
            throw new Error("Somthing went wrong, Please try again later");
        } finally {
            set({ isLoading: false });
        }
    },
    removeFromCart: (product) => {},
    clearCart: () => {},
    setCart: (cart) => {},
    increaseQuantity: (id) => {},
    decreaseQuantity: (id) => {},
    checkout: () => {},
}));