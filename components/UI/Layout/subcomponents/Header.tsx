import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-rustOne px-4">
      <Link href="/" className="flex justify-between items-center hover:text-white">
        <img src="/rust-server-logo.jpg" width={100} height={100} alt="rust server logo" />
        <div>
          <h2 className="font-rust text-2xl sm:text-4xl tracking-[0.065rem] [text-shadow:_3px_3px_0_rgb(0_0_0_/_40%)]">
            RUST SERVER FILTER
          </h2>
          <h3 className="hidden md:block [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]">
            Advanced filters for Rust servers. Browse, search, find, sort
          </h3>
        </div>
      </Link>
      <div>
        <Link
          href="/"
          className="text-gray-200 [text-shadow:_3px_3px_0_rgb(0_0_0_/_40%)] font-rust tracking-[0.100rem] text-center px-1 mx-4 rounded sm:w-30 text-md md:text-lg transition-all cursor-pointer hover:text-white
          block"
        >
          HOME
        </Link>
        <Link
          href="/about"
          className="text-gray-200 [text-shadow:_3px_3px_0_rgb(0_0_0_/_40%)] font-rust tracking-[0.100rem] text-center px-1 mx-4 rounded sm:w-30 text-md md:text-lg transition-all cursor-pointer hover:text-white
          block"
        >
          ABOUT
        </Link>
        <Link
          href="/FAQ"
          className="text-gray-200 [text-shadow:_3px_3px_0_rgb(0_0_0_/_40%)] font-rust tracking-[0.100rem] text-center px-1 mx-4 rounded sm:w-30 text-md md:text-lg transition-all cursor-pointer hover:text-white
          block"
        >
          FAQ
        </Link>
      </div>
    </header>
  );
}

export default Header;
