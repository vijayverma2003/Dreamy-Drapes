import Button from "@/app/components/Button";
import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { GoPlus } from "react-icons/go";

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    include: { collection: true },
  });

  return (
    <section>
      <header className="flex w-full justify-between items-center border-b border-b-zinc-600 pb-4">
        <h3 className="text-lg m-0">Products</h3>
        <Link href="/admin/products/new">
          <Button label="Add Product" Component={GoPlus} />
        </Link>
      </header>
      <div>
        {products.map((product) => (
          <Link
            href={`/admin/products/${product.id}`}
            id={product.id.toString()}
            className="px-4 py-4 bg-zinc-800 bg-opacity-20 border border-zinc-800 rounded-md my-6 flex items-center justify-between"
          >
            <div>
              <p className="text-xs">{product.name}</p>
              <p className="text-xs mt-2 text-zinc-600">
                {product.collection?.name ?? "None"}
              </p>
            </div>
            <div>
              <p className="text-xs text-right font-semibold">
                $ {product.price.toNumber()}
              </p>
              <p className="text-xs mt-2 text-zinc-600 text-right">
                {product.inventory} units
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
