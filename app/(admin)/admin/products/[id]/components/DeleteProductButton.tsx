"use client";

import Button from "@/app/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteProductButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${id}/`);
      router.push(`/admin/products`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={handleDelete} className="bg-red-600" label="Delete" />
  );
};

export default DeleteProductButton;
