import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="grid grid-cols-3 place-items-center mx-auto gap-8 container">
      {Array(10)
        .fill(1)
        .map((item) => (
          <div className="flex flex-col gap-4">
            <div className="border border-zinc-700 rounded-sm relative">
              <Image
                src={
                  "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbaby-onesie-white-1.png%3Fv%3D1690002631&w=1920&q=75"
                }
                alt="Product Image"
                width={400}
                height={400}
              />
              <Link
                href={"#"}
                className="text-xs absolute bottom-4 left-4  border border-zinc-700 rounded-3xl pl-4 py-3 backdrop-blur-2xl"
              >
                Product Name
                <span className="px-6 py-3 ml-4 rounded-full bg-blue-600 font-bold">
                  $39.9
                </span>
              </Link>
            </div>
          </div>
        ))}
    </section>
  );
};

export default page;
