"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productSchema } from "@/app/modelSchema";
import { useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import { FiArrowRight } from "react-icons/fi";

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = () => {
  const { register } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  return (
    <section className="flex justify-center flex-col w-full min-w-[400px]">
      <header className="flex justify-between items-center backdrop-blur-lg w-full border-b border-b-zinc-700 pb-4">
        <h3 className="text-lg">Product Form</h3>
        <Button label="Submit" Component={FiArrowRight} />
      </header>
      <form className="my-8 flex flex-col gap-8 w-full max-w-lg">
        <div>
          <label className="block text-xs mb-2 text-zinc-400" htmlFor="name">
            Name
          </label>
          <input
            {...register("name")}
            className="border text-sm border-zinc-700 px-4 py-2 outline-none w-full rounded-md"
          />
        </div>
        <div>
          <label className="block text-xs mb-2 text-zinc-400" htmlFor="price">
            Unit Price
          </label>
          <input
            type="number"
            {...register("price")}
            className="border text-sm border-zinc-700 px-4 py-2 outline-none w-full rounded-md"
          />
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
            {...register("inventory")}
            className="border text-sm border-zinc-700 px-4 py-2 outline-none w-full rounded-md"
          />
        </div>
        <div>
          <label
            className="block text-xs mb-2 text-zinc-400"
            htmlFor="collectionId"
          >
            Collection
          </label>
          <select
            {...register("collectionId")}
            className="border text-sm border-zinc-700 px-4 py-2 outline-none w-full rounded-md"
          />
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
            className="border text-sm border-zinc-700 px-4 py-2 outline-none w-full rounded-md"
          />
        </div>
      </form>
    </section>
  );
};

export default ProductForm;
