import Button from "@/app/components/Button";
import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { GoPlus } from "react-icons/go";

const CollectionsPage = async () => {
  const collections = await prisma.collection.findMany({
    include: { Product: { select: { _count: true } } },
  });

  console.log(collections);

  return (
    <section>
      <header className="flex w-full justify-between items-center border-b border-b-zinc-600 pb-4">
        <h3 className="text-lg m-0">Collections</h3>
        <Link href="/admin/collections/new">
          <Button label="Add Collection" Component={GoPlus} />
        </Link>
      </header>
      <div>
        {collections.map((collection) => (
          <div className="px-4 py-4 bg-zinc-800 bg-opacity-20 border border-zinc-800 rounded-md my-6">
            <p className="text-xs">{collection.name}</p>
            <p className="text-xs mt-2 text-zinc-600">
              Number of Products - {collection.Product.length}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionsPage;
