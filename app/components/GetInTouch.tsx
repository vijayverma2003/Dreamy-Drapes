import Image from "next/image";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { Julius_Sans_One } from "next/font/google";
import { FaChevronRight } from "react-icons/fa";

const juliusSansOne = Julius_Sans_One({ weight: "400", subsets: ["latin"] });

const GetInTouch = () => {
  return (
    <section className="grid grid-cols-2 gap-6 container m-auto place-items-center">
      <div>
        <Image
          src="/getintouch.jpg"
          alt="get-in-touch"
          width={400}
          height={400}
          className="w-[400px] h-[400px] object-cover"
        />
      </div>
      <div className="place-self-center">
        <h1 className={`text-5xl text-zinc-700 ${juliusSansOne.className}`}>
          GET IN TOUCH
        </h1>
        <p className="text-sm text-zinc-500 mt-8 ml-2 max-w-[500px] leading-relaxed">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci,
          aut, alias suscipit voluptates at commodi maxime numquam illo porro,
          harum architecto recusandae laborum fuga! Sunt vel veniam animi
          aliquam necessitatibus adipisci distinctio, eos provident, mollitia
          libero ipsa ut fugit ratione inventore corporis ex repellendus
          consequatur fugiat magnam porro. Fuga, fugiat!
        </p>
        <div className="flex items-center bg-black rounded-sm overflow-hidden border border-slate-900 mt-16">
          <input
            type="text"
            className="outline-none  py-4 px-4 placeholder:text-base text-base tracking-wide w-full"
            placeholder="Enter your Email..."
          />
          <button className="px-6 py-4">
            <FaChevronRight color="white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
