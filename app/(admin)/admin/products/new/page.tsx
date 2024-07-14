import prisma from "@/prisma/client";
import ProductForm from "../components/ProductForm";

const ProductFormPage = async () => {
  const collections = await prisma.collection.findMany();

  return <ProductForm collections={collections} />;
};

export default ProductFormPage;
