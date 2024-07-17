"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productSchema } from "@/app/modelSchema";
import { useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import { FiArrowRight } from "react-icons/fi";
import { Collection } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = ({ collections }: { collections: Collection[] }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const uploadsPublicIds: string[] = [];

    try {
      for (let image of images) {
        if (!image) continue;

        const blob = new Blob([image]);

        const formData = new FormData();
        formData.set("file", blob);
        formData.set(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_UPLOAD_PRESET!
        );

        try {
          await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env
              .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload/`,
            formData
          );
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {}
    try {
      await axios.post("/api/products", data);
      router.push("/admin/products");
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data.error === "string"
      )
        setError(error.response.data.error);
      else setError("An unexpected error occured");
    }
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files) return;

    if (images.length > 10) {
      setError("You can add maximum 10 image for a product");
      return;
    }

    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

    for (let file of event.target.files) {
      if (!allowedFileTypes.includes(file.type)) {
        setImages((images) => [...images, null]);
        return;
      }

      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        setImages((images) => [...images, fileReader.result]);
      };

      fileReader.readAsDataURL(file);
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
        <h3 className="text-lg">Product Form</h3>
        <Button onClick={onSubmit} label="Submit" Component={FiArrowRight} />
      </header>
      {error && (
        <p className="my-4 text-xs border rounded-sm border-red-600 bg-red-600 bg-opacity-10 px-4 py-3">
          {error}
        </p>
      )}
      <form className="my-8 flex flex-col gap-8 w-full max-w-lg">
        <div>
          <label className="block text-xs mb-2 text-zinc-400" htmlFor="name">
            Name
          </label>
          <input
            {...register("name")}
            className="border text-sm border-zinc-700 px-2 py-2 outline-none w-full rounded-md"
          />
          <p className="text-[10px] mt-2 text-red-600">
            {errors.name?.message}
          </p>
        </div>
        <div>
          <label className="block text-xs mb-2 text-zinc-400" htmlFor="price">
            Unit Price
          </label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="border text-sm border-zinc-700 px-2 py-2 outline-none w-full rounded-md"
          />
          <p className="text-[10px] mt-2 text-red-600">
            {errors.price?.message}
          </p>
        </div>
        <div>
          <label
            className="block text-xs mb-2 text-zinc-400"
            htmlFor="inventory"
          >
            Inventory
          </label>
          <input
            type="number"
            {...register("inventory", { valueAsNumber: true })}
            className="border text-sm border-zinc-700 px-2 py-2 outline-none w-full rounded-md"
          />
          <p className="text-[10px] mt-2 text-red-600">
            {errors.inventory?.message}
          </p>
        </div>
        <div>
          <label
            className="block text-xs mb-2 text-zinc-400"
            htmlFor="collectionId"
          >
            Collection
          </label>
          <select
            {...register("collectionId", {
              setValueAs(value) {
                if (!isNaN(Number(value))) return Number(value);
                return null;
              },
            })}
            className="border text-sm border-zinc-700 px-2 py-2 outline-none w-full rounded-md"
          >
            <option value={undefined}>Select Collection...</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
          <p className="text-[10px] mt-2 text-red-600">
            {errors.collectionId?.message}
          </p>
        </div>
        <div>
          <label
            className="block text-xs mb-2 text-zinc-400"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            rows={10}
            {...register("description")}
            className="border text-sm border-zinc-700 px-2 py-2 outline-none w-full rounded-md"
          />
          <p className="text-[10px] mt-2 text-red-600">
            {errors.description?.message}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 place-items-center mb-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="border border-zinc-700 rounded-lg mb-1.5 relative"
            >
              {image ? (
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={image.toString()}
                    alt={`Product Image ${index}`}
                    width={120}
                    height={120}
                    className="object-cover w-[120px] h-[120px] overflow-hidden"
                  />
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="top-0 right-0 translate-x-1/2 -translate-y-1/2 absolute bg-red-600 rounded-full bg-opacity-50 border border-red-600 border-opacity-25"
              >
                <IoIosClose size={16} />
              </button>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-xs mb-2 text-zinc-400" htmlFor="image">
            Product Images
          </label>
          <input
            multiple
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="border text-sm border-zinc-700 px-2 py-2 outline-none w-full rounded-md"
          />
        </div>
      </form>
    </section>
  );
};

export default ProductForm;
