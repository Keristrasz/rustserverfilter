import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-rustOne px-4">
      <Link href="/" className="flex justify-between items-center hover:text-white ">
        <img src="/logo-small2.jpg" width={100} height={100} alt="heading logo" />
        <div>
          <h2 className="font-rust text-4xl tracking-[0.065rem] [text-shadow:_3px_3px_0_rgb(0_0_0_/_40%)]">
            RUST SERVER FILTER
          </h2>
          <h3 className="hidden md:block [text-shadow:_2px_2px_0_rgb(0_0_0_/_50%)]">
            Search, find, filter, sort your solo duo trio quad rust servers
          </h3>
        </div>
      </Link>
      <div>
        <Link
          href="/"
          className="hidden text-gray-200 [text-shadow:_3px_3px_0_rgb(0_0_0_/_40%)] font-rust tracking-[0.100rem] text-center px-1 mx-4 rounded sm:w-30 text-lg transition-all cursor-pointer hover:text-white
          md:block"
        >
          HOME
        </Link>
        <Link
          href="/FAQ"
          className="hidden text-gray-200 [text-shadow:_3px_3px_0_rgb(0_0_0_/_40%)] font-rust tracking-[0.100rem] text-center px-1 mx-4 rounded sm:w-30 text-lg transition-all cursor-pointer hover:text-white
          md:block"
        >
          FAQ
        </Link>
        <Link
          href="https://discord.gg/D6hF8hhBFj"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-gray-200 [text-shadow:_3px_3px_0_rgb(0_0_0_/_40%)] font-rust tracking-[0.100rem] text-center px-1 mx-4 rounded sm:w-30 text-lg transition-all cursor-pointer hover:text-white
          md:block"
        >
          DISCORD
        </Link>
      </div>
    </header>
  );
}

export default Header;
