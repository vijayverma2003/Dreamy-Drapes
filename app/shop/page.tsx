import prisma from "@/prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const products = await prisma.product.findMany({
    include: { ProductImage: true },
  });

  return (
    <section className="products-grid place-items-center mx-auto gap-8 container">
      {products.map((item) => (
        <div className="flex flex-col items-center gap-4 w-full h-full">
          <div className="border border-zinc-700 h-full rounded-sm relative w-full min-h-[400px] flex-1 flex justify-center items-center">
            {item.ProductImage[0] && item.ProductImage[0].url ? (
              <Image
                src={item.ProductImage[0].url}
                alt="Product Image"
                width={400}
                height={400}
                className="h-[400px] object-cover"
              />
            ) : (
              <p className="">Image Not found</p>
            )}
            <Link
              href={"#"}
              className="text-xs absolute bottom-4 left-4  border border-zinc-700 rounded-3xl pl-4 py-3 backdrop-blur-2xl"
            >
              {item.name}
              <span className="px-6 py-3 ml-4 rounded-full bg-blue-600 font-bold">
                $ {item.price.toNumber()}
              </span>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default page;
