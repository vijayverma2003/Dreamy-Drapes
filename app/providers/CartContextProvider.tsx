"use client";

import { CartContext } from "@/app/contexts/CartContext";
import React, { PropsWithChildren, useState } from "react";

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartOpen, useCartOpen] = useState(false);

  return (
    <CartContext.Provider value={{ value: cartOpen, handler: useCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
