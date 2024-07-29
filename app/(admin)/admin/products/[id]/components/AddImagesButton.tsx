"use client";

import Button from "@/app/components/Button";
import { useRef } from "react";
import ProductImageForm from "./ProductImageForm";

const AddImagesButton = ({ id }: { id: string }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDialog = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    else dialogRef.current?.showModal();
  };

  return (
    <>
      <dialog ref={dialogRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <ProductImageForm productId={parseInt(id)} />
          <div className="modal-action">
            <Button
              onClick={handleDialog}
              className="btn btn-error text-white"
              label="Close"
            />
          </div>
        </div>
      </dialog>
      <Button onClick={handleDialog} label="Add Images" />
    </>
  );
};

export default AddImagesButton;
