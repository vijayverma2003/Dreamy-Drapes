import prisma from "@/prisma/client";
import Image from "next/image";

const ProductImagesPage = async ({ params }: { params: { id: string } }) => {
  const images = await prisma.productImage.findMany({
    where: { productId: parseInt(params.id) },
  });

  return (
    <div>
      <h1 className="mb-12">Product Images</h1>
      <div
        className={`grid grid-cols-5 gap-4 grid-rows-${Math.ceil(
          images.length / 4
        )} grid-rows-10`}
      >
        {images.map((image) =>
          image?.url ? (
            <div key={image.id}>
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
    </div>
  );
};

export default ProductImagesPage;
