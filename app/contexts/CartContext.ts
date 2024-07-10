"use client";

import { createContext, Dispatch, SetStateAction } from "react";

interface CartState {
  value: boolean;
  handler?: Dispatch<SetStateAction<boolean>>;
}

export const CartContext = createContext<CartState>({ value: false });
