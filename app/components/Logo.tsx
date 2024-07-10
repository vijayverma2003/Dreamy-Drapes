import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image src={"/logo-white.png"} width={40} height={40} alt="Company Logo" />
  );
};

export default Logo;
