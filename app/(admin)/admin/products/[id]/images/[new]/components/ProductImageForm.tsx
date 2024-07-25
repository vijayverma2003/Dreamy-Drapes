"use client";

import Button from "@/app/components/Button";
import Loader from "@/app/components/Loader";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";

const ProductImageForm = ({ productId }: { productId: number }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const [images, setImages] = useState<
    {
      image: string;
      uploading?: boolean;
      error?: boolean;
    }[]
  >([]);

  const [uploadingImages, setUploadingImages] = useState<
    {
      uploading: boolean;
      failed: boolean;
    }[]
  >([]);

  const uploadImage = async (index: number) => {
    console.log(index);

    setUploadingImages((prevImages) => {
      const images = [...prevImages];
      images[index] = { uploading: true, failed: false };
      return images;
    });

    try {
      await axios.post(`/api/products/${productId}/images/`, images[index]);
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data.error === "string"
      )
        setError(error.response.data.error);
      else setError("An unexpected error occured");

      setUploadingImages((prevImages) => {
        const images = [...prevImages];
        images[index] = { uploading: false, failed: true };
        return images;
      });

      return;
    }

    setUploadingImages((prevImages) => {
      const images = [...prevImages];
      images[index] = { uploading: false, failed: false };
      return images;
    });
  };

  const handleSubmit = async () => {
    for (let i = 0; i < images.length; i++) {
      uploadImage(i);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files) return;

    if (images.length > 10) {
      setError("You can add maximum 10 image for a product");
      return;
    }

    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

    for (let file of event.target.files) {
      if (!allowedFileTypes.includes(file.type)) continue;
      else {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          setImages((images) => [
            ...images,
            {
              image: fileReader.result as string,
            },
          ]);
        };
        fileReader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const productImages = [...images];
    productImages.splice(index, 1);
    setImages(productImages);
  };

  return (
    <section className="flex justify-center flex-col w-full min-w-[400px]">
      <header className="flex justify-between items-center backdrop-blur-lg w-full border-b border-b-zinc-700 pb-4">
        <h3 className="text-lg">Product Images</h3>
        <Button
          onClick={handleSubmit}
          label="Submit"
          Component={FiArrowRight}
        />
      </header>

      {error && (
        <p className="my-4 text-xs border rounded-sm border-red-600 bg-red-600 bg-opacity-10 px-4 py-3">
          {error}
        </p>
      )}

      <form className="my-8 flex flex-col gap-8 w-full max-w-lg">
        <div>
          {images.length > 0 && (
            <div>
              <label
                className="block text-xs mb-2 text-zinc-400"
                htmlFor="image"
              >
                Product Images
              </label>
              <div className="grid grid-cols-4 gap-2 place-items-center mb-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="border border-zinc-700 rounded-lg mb-1.5 relative overflow-hidden">
                      <div className="overflow-hidden rounded-lg z-0">
                        {uploadingImages[index] && (
                          <div
                            className={`w-full h-full bg-black bg-opacity-80 z-10 absolute flex justify-center items-center`}
                          >
                            {uploadingImages[index].uploading && <Loader />}
                            {!uploadingImages[index].uploading &&
                              uploadingImages[index].failed && (
                                <p className="text-xs text-red-500">Failed</p>
                              )}
                            {!uploadingImages[index].uploading &&
                              !uploadingImages[index].failed && (
                                <FaRegCircleCheck color="green" size={24} />
                              )}
                          </div>
                        )}
                        {image ? (
                          <Image
                            src={image.image.toString()}
                            alt={`Product Image ${index}`}
                            width={120}
                            height={120}
                            className="object-cover w-[120px] h-[120px]"
                          />
                        ) : null}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="top-1 right-1 z-20 translate-x-1/2 -translate-y-1/2 absolute bg-red-600 rounded-full bg-opacity-50 border border-red-600 border-opacity-25"
                    >
                      <IoIosClose size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Button
            type="button"
            label="Select Images"
            Component={SlCloudUpload}
            onClick={() => {
              fileInputRef.current?.click();
            }}
          />
          <input
            ref={fileInputRef}
            multiple
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="border text-sm border-zinc-700 px-2 py-2 outline-none w-full rounded-md hidden"
          />
        </div>
      </form>
    </section>
  );
};

export default ProductImageForm;
