import React from "react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-rustOne px-4">
      <Link href="/" className="flex justify-between items-center">
        <Image src="/logo-small2.jpg" width={100} height={100} alt="heading logo" />
        <div>
          <h2 className="font-bold text-4xl tracking-normal">RUST SERVER FILTER</h2>
          <h3>Search, filter, sort your solo duo trio quad + rust servers</h3>
        </div>
      </Link>
      <Link
        href="/"
        className={`text-gray-200 text-center font-semibold py-2 px-4 mx-4 rounded sm:w-48 text-lg transition-all cursor-pointer hover:text-green-300
          `}
      >
        Home
      </Link>
    </header>
  );
}

export default Header;
