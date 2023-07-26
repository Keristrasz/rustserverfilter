import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-rustOne px-4">
      <Link href="/" className="flex justify-between items-center hover:text-white">
        <img src="/rust-server-logo.jpg" width={100} height={100} alt="rust server" />
        <div>
          <h2 className="font-rust text-4xl tracking-[0.065rem]">RUST SERVER FILTER</h2>
          <h3 className="hidden md:block">
            Search, find, filter, sort your solo duo trio quad rust servers
          </h3>
        </div>
      </Link>
      <div>
        <Link
          href="/"
          className="hidden text-gray-200 font-rust tracking-[0.100rem] text-center px-1 mx-4 rounded sm:w-30 text-lg transition-all cursor-pointer hover:text-white
          md:block"
        >
          HOME
        </Link>
        <Link
          href="/about"
          className="hidden text-gray-200 font-rust tracking-[0.100rem] text-center px-1 mx-4 rounded sm:w-30 text-lg transition-all cursor-pointer hover:text-white
          md:block"
        >
          ABOUT
        </Link>
        <Link
          href="/FAQ"
          className="hidden text-gray-200 font-rust tracking-[0.100rem] text-center px-1 mx-4 rounded sm:w-30 text-lg transition-all cursor-pointer hover:text-white
          md:block"
        >
          FAQ
        </Link>
      </div>
    </header>
  );
}

export default Header;
