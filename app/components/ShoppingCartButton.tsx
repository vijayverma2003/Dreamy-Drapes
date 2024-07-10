"use client";

import React, { useContext } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { CartContext } from "../contexts/CartContext";

const ShoppingCartButton = () => {
  const { value: cartIsOpen, handler } = useContext(CartContext);

  return (
    <button onClick={() => handler!(!cartIsOpen)}>
      <CiShoppingCart color="white" size={28} />
    </button>
  );
};

export default ShoppingCartButton;
