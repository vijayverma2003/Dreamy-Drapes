"use client";

import { CartContext } from "@/app/contexts/CartContext";
import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";

const Cart = () => {
  const { value: cartIsOpen, handler } = useContext(CartContext);

  return (
    <aside
      className={`h-full max-h-full bg-black bg-opacity-70 backdrop-blur-3xl min-w-[400px] right-0 top-0 z-50 fixed px-6 py-8 flex flex-col justify-between transition-transform ease-in-out duration-200 ${
        cartIsOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <header className="flex justify-between items-center">
        <h3 className="text-lg font-bold">My Cart</h3>
        <button onClick={() => handler!(!cartIsOpen)}>
          <IoMdClose size={20} />
        </button>
      </header>
      <footer>
        <div className="flex justify-between items-center border-b border-zinc-600 my-2">
          <p className="text-sm my-2">Taxes</p>
          <p className="text-sm my-2">$0.00 USD</p>
        </div>
        <div className="flex justify-between items-center border-b border-zinc-600 my-2">
          <p className="text-sm my-2">Shipping</p>
          <p className="text-sm my-2">$0.00 USD</p>
        </div>
        <div className="flex justify-between items-center border-b border-zinc-600 my-2">
          <p className="text-sm my-2">Total</p>
          <p className="text-sm my-2">$40.00 USD</p>
        </div>
        <button className="bg-blue-600 py-2 w-full rounded-full mt-4 text-sm font-semibold">
          Proceed to Checkout
        </button>
      </footer>
    </aside>
  );
};

export default Cart;
