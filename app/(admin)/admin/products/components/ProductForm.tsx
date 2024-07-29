"use client";

import Button from "@/app/components/Button";
import { productSchema } from "@/app/modelSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collection } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowRight } from "react-icons/fi";
import { z } from "zod";

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = ({ collections }: { collections: Collection[] }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: product } = await axios.post("/api/products", data);
      router.push(`/admin/products/${product.id}/images/new`);
      router.refresh();
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data.error === "string"
      )
        setError(error.response.data.error);
      else setError("An unexpected error occured");
    }
  });

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
      </form>
    </section>
  );
};

export default ProductForm;
