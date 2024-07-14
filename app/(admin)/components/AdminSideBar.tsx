import Link from "next/link";
import React from "react";

const AdminSideBar = () => {
  return (
    <div className="min-w-[320px] min-h-screen h-full px-6 text-xs">
      <ul>
        <li className="mt-4 text-zinc-400">
          <Link href={"/admin/products"}>Products</Link>
        </li>
        <li className="mt-4 text-zinc-400">
          <Link href={"/admin/collections"}>Collections</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
