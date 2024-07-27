import Button from "@/app/components/Button";
import prisma from "@/prisma/client";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";

const ProductViewPage = async ({ params }: { params: { id: string } }) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
    include: { ProductImage: true, collection: true },
  });

  if (!product) return null;

  return (
    <section>
      <header className="flex justify-between items-center backdrop-blur-lg w-full border-b border-b-zinc-700 pb-4">
        <h3 className="text-lg font-extrabold">{product.name}</h3>

        <div className="flex items-center gap-4">
          <Button label="Edit" />
          <Button className="bg-red-600" label="Delete" />
        </div>
      </header>

      <div className="mt-8">
        <ul className="text-sm">
          <li className="mt-2">Price - ${product.price.toNumber()}</li>
          <li className="mt-2">
            Collection - {product.collection?.name ?? "Not found"}
          </li>
          <li className="mt-2">Inventory - {product.inventory}</li>
          <li className="mt-2">
            Created At - {new Date(product.updatedAt.getTime()).toString()}
          </li>
          <li className="mt-2">
            Updated At - {new Date(product.updatedAt.getTime()).toString()}
          </li>
        </ul>
      </div>

      <h1 className="my-12 font-extrabold">Product Images</h1>

      <div
        className={`grid grid-cols-5 gap-4 grid-rows-${Math.ceil(
          product.ProductImage.length / 4
        )} grid-rows-10`}
      >
        {product.ProductImage.map((image) =>
          image?.url ? (
            <div key={image.id} className="relative">
              <div className="absolute top-3 right-3">
                <button className="p-1 bg-red-700 bg-opacity-30 rounded-full">
                  <MdDeleteOutline size={20} color="red" />
                </button>
              </div>
              <Image
                src={image.url}
                width={200}
                height={200}
                alt="product-image"
                className="product-image max-h-[200px] max-w-[200px] w-full h-full object-cover"
              />
            </div>
          ) : (
            <div />
          )
        )}
      </div>
    </section>
  );
};

export default ProductViewPage;
