import Button from "@/app/components/Button";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import ProductImages from "../components/ProductImages";
import AddImagesButton from "./components/AddImagesButton";

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
          <AddImagesButton id={params.id} />
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

      <ProductImages images={product.ProductImage} />
    </section>
  );
};

export default ProductViewPage;
