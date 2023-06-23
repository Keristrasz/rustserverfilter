import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-rustOne px-4">
      <Link href="/" className="flex justify-between items-center hover:text-white">
        <img src="/logo-small2.jpg" width={100} height={100} alt="heading logo" />
        <div>
          <h2 className="font-rust text-4xl tracking-[0.065rem]">RUST SERVER FILTER</h2>
          <h3 className="hidden md:block">
            Search, find, filter, sort your solo duo trio quad rust servers
          </h3>
        </div>
      </Link>
      <Link
        href="/"
        className="hidden text-gray-200 text-center font-semibold py-2 px-4 mx-4 rounded sm:w-48 text-lg transition-all cursor-pointer hover:text-white
          md:block"
      >
        Home
      </Link>
    </header>
  );
}

export default Header;
