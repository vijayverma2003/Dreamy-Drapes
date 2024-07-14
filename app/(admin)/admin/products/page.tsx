import Button from "@/app/components/Button";
import Link from "next/link";
import React from "react";
import { GoPlus } from "react-icons/go";

const ProductsPage = () => {
  return (
    <section>
      <header className="flex w-full justify-between items-center border-b border-b-zinc-600 pb-4">
        <h3 className="text-lg m-0">Products</h3>
        <Link href="/admin/products/new">
          <Button label="Add Product" Component={GoPlus} />
        </Link>
      </header>
    </section>
  );
};

export default ProductsPage;
