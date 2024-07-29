"use client";

import { ProductImage } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const ProductImages = ({ images }: { images: ProductImage[] }) => {
  const params = useParams();
  const [productImages, setProductImages] = useState<ProductImage[]>([]);

  useEffect(() => {
    setProductImages(images);
  }, [images]);

  const handleProductImageDelete = async (image: ProductImage) => {
    setProductImages((images) => images.filter((img) => img.id !== image.id));

    try {
      await axios.delete(`/api/products/${params.id}/images/${image.id}`);
    } catch (error) {
      setProductImages((images) => [...images, image]);
    }
  };

  return (
    <div
      className={`grid grid-cols-5 gap-4 grid-rows-${Math.ceil(
        images.length / 4
      )} grid-rows-10`}
    >
      {productImages.map((image) =>
        image?.url ? (
          <div key={image.id} className="relative">
            <div className="absolute top-3 right-3">
              <button
                onClick={() => handleProductImageDelete(image)}
                className="p-1 bg-red-700 bg-opacity-30 rounded-full"
              >
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
  );
};

export default ProductImages;
