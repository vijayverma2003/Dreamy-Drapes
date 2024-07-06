import Image from "next/image";
import React from "react";

const Collection = () => {
  const collections = [
    { link: "/collection/1.jpg", name: "Shoes" },
    { link: "/collection/2.jpg", name: "Men Fashion" },
    { link: "/collection/3.jpg", name: "Women" },
    { link: "/collection/4.jpg", name: "Accessory" },
  ];

  return (
    <section>
      <div className="py-12 text-center bg-zinc-900">
        <h2 className="leading-normal text-xl">
          SHOP OUR NEW PRODUCTS OF THE SEASON
        </h2>
      </div>
      <div className="py-32">
        <h2 className="text-center text-xl">NEW COLLECTION</h2>
        <div className="py-16">
          <div className="grid grid-cols-4 gap-2 items-center container m-auto">
            {collections.map((image) => (
              <div className="flex items-center flex-col">
                <Image
                  src={image.link}
                  alt="collection-image"
                  width={300}
                  height={300}
                  className="w-60 h-60 object-cover border border-zinc-900"
                />
                <div className="text-center mt-4">
                  <h3 className="text-sm text-zinc-500">{image.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
