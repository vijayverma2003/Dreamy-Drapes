import Link from "next/link";
import React from "react";

const Collections = () => {
  return (
    <div>
      <h4 className="text-xs text-zinc-500">Collections</h4>
      <ul>
        <li className="text-sm mt-4 text-zinc-400">
          <Link href={"#"}>All</Link>
        </li>
        <li className="text-sm mt-4 text-zinc-400">
          <Link href={"#"}>Men</Link>
        </li>
        <li className="text-sm mt-4 text-zinc-400">
          <Link href={"#"}>Women</Link>
        </li>
        <li className="text-sm mt-4 text-zinc-400">
          <Link href={"#"}>Accessory</Link>
        </li>
        <li className="text-sm mt-4 text-zinc-400">
          <Link href={"#"}>Shoes</Link>
        </li>
        <li className="text-sm mt-4 text-zinc-400">
          <Link href={"#"}>Kids</Link>
        </li>
      </ul>
    </div>
  );
};

export default Collections;
