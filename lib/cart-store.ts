// Cart store — Zustand + localStorage persistence.

"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = Product & { qty: number };

export type DeliveryData = {
  date: number; // offset from base date (0..13)
  time: string;
  where: "venue" | "jitaku" | "office" | "tera" | "other";
  saijyou: string;
  zip: string;
  addr: string;
  people: number;
  contactName: string;
  contactPhone: string;
  contactRel: string;
  noshi: string;
  noshiName: string;
  note: string;
  payment: "invoice" | "card" | "cod" | "bank";
};

type CartState = {
  cart: CartItem[];
  delivery: DeliveryData | null;
  addToCart: (p: Product, qty: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setDelivery: (d: DeliveryData) => void;
};

const defaultDelivery: DeliveryData = {
  date: 2,
  time: "18:00",
  where: "venue",
  saijyou: "",
  zip: "",
  addr: "",
  people: 20,
  contactName: "",
  contactPhone: "",
  contactRel: "",
  noshi: "御祝",
  noshiName: "",
  note: "",
  payment: "card",
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      delivery: null,
      addToCart: (p, qty) => {
        // Catering items are quote-based; guard here in case a direct call slips through.
        if (p.type === "catering") {
          console.warn(
            "[cart] catering items cannot be added — direct inquiry only",
            p.id
          );
          return;
        }
        const cart = get().cart;
        const existing = cart.find((c) => c.id === p.id);
        if (existing) {
          set({
            cart: cart.map((c) =>
              c.id === p.id ? { ...c, qty: c.qty + qty } : c
            ),
          });
        } else {
          set({ cart: [...cart, { ...p, qty }] });
        }
      },
      setQty: (id, qty) => {
        set({
          cart: get().cart.map((c) =>
            c.id === id ? { ...c, qty: Math.max(1, qty) } : c
          ),
        });
      },
      remove: (id) => {
        set({ cart: get().cart.filter((c) => c.id !== id) });
      },
      clear: () => set({ cart: [] }),
      setDelivery: (d) => set({ delivery: d }),
    }),
    {
      name: "izumi_ec_cart_v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { defaultDelivery };
