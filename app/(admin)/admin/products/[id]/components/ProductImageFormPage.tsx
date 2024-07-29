import prisma from "@/prisma/client";
import ProductImageForm from "./ProductImageForm";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) return notFound();
  return (
    <dialog className="modal modal-middle">
      <ProductImageForm productId={parseInt(params.id)} />
    </dialog>
  );
};

export default page;
