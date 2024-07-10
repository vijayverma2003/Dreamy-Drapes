import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import ShoppingCartButton from "./ShoppingCartButton";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black">
      <div className="flex items-center gap-10 text-slate-300">
        <Image
          src="/logo-white.png"
          alt="Company Logo"
          width={32}
          height={32}
        ></Image>
        <div className="flex justify-between items-center gap-8 text-sm">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
        </div>
      </div>
      <div>
        <div className="flex items-center bg-black rounded-sm overflow-hidden border border-slate-900">
          <input
            type="text"
            className="outline-none  py-1.5 px-2 placeholder:text-xs text-sm tracking-wide min-w-96"
            placeholder="Search for products..."
          />
          <button className="px-3 py-1.5">
            <CiSearch color="white" />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center gap-8 text-sm text-white">
        <Link href="#">Orders</Link>
        <ShoppingCartButton />
      </div>
    </nav>
  );
};

export default Navbar;
