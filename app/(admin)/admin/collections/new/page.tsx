"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { collectionSchema } from "@/app/modelSchema";
import { useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import { FiArrowRight } from "react-icons/fi";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CollectionFormData = z.infer<typeof collectionSchema>;

const CollectionForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, handleSubmit } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/collections", { name: data.name.trim() });
      router.push("/admin/collections");
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
        <h3 className="text-lg">Create Collection</h3>
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
            className="border text-sm border-zinc-700 px-4 py-2 outline-none w-full rounded-md"
          />
        </div>
      </form>
    </section>
  );
};

export default CollectionForm;
