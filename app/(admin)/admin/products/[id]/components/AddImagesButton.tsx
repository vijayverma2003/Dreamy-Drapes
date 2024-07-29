"use client";

import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

const AddImagesButton = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(`/admin/products/${id}/images/new`)}
      label="Add Images"
    />
  );
};

export default AddImagesButton;
