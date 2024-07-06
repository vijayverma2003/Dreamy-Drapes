import Image from "next/image";
import React from "react";
import { Julius_Sans_One } from "next/font/google";

const juliusSansOne = Julius_Sans_One({ weight: "400", subsets: ["latin"] });

const Hero = () => {
  return (
    <section>
      <div className="grid grid-cols-2 items-center">
        <div className="text-white place-self-center flex flex-col gap-8 items-center">
          <h1
            className={`text-6xl text-center leading-tight ${juliusSansOne.className} border-b-2 inline-block`}
          >
            NEW <br /> COLLECTION
          </h1>
          <button className="px-12 py-3 border-2">SHOP NOW</button>
        </div>
        <div className="place-self-end relative">
          <Image
            src="/hero/2.jpg"
            alt="Fashion"
            width={300}
            height={400}
            className="absolute top-1/2 right-3/4 -translate-y-1/2"
          />
          <Image src="/hero/1.jpg" alt="Fashion" width={528} height={800} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
