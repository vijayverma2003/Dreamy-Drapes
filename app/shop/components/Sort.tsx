import Link from "next/link";
import React from "react";

const Sort = () => {
  return (
    <div>
      <h4 className="text-xs text-zinc-500 mt-12">Sort by</h4>
      <ul>
        <li className="text-sm mt-4 text-zinc-400">
          <Link href={"#"}>Relevance</Link>
        </li>
        <li className="text-sm mt-4 text-zinc-400">
          <Link href={"#"}>Latest Arrivals</Link>
        </li>
        <li className="text-sm mt-4 text-zinc-400">
          <Link href={"#"}>Price: Low to High</Link>
        </li>
        <li className="text-sm mt-4 text-zinc-400">
          <Link href={"#"}>Price: High to Low</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sort;
