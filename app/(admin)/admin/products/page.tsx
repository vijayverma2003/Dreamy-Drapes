import Link from "next/link";
import React from "react";
import { GoPlus } from "react-icons/go";

const ProductsPage = () => {
  return (
    <section>
      <header className="flex w-full justify-between items-center border-b border-b-zinc-600 pb-4">
        <h3 className="text-lg m-0">Products</h3>
        <Link href="/admin/products/new">
          <button className="bg-blue-600 px-4 py-3 text-xs rounded-full flex items-center gap-2">
            <span>Add Product</span> <GoPlus size={16} />
          </button>
        </Link>
      </header>
    </section>
  );
};

export default ProductsPage;
