import React from "react";
import ProductImageForm from "./components/ProductImageForm";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <ProductImageForm productId={parseInt(params.id)} />
    </div>
  );
};

export default page;
