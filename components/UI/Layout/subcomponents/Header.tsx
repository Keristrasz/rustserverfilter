import React from "react";
import Link from "next/link";

const links = [
  { href: "/", text: "HOME" },
  { href: "/about", text: "ABOUT" },
  { href: "/FAQ", text: "FAQ" },
];

function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-rustOne px-4">
      <Link href="/" className="flex justify-between items-center hover:text-white">
        <img src="/rust-server-logo.jpg" width={100} height={100} alt="rust server logo" />
        <div>
          <h2 className="font-rust text-2xl sm:text-4xl tracking-[0.065rem] [text-shadow:_3px_3px_3px_rgb(0_0_0_/_60%)]">
            RUST SERVER FILTER
          </h2>
          <h3 className="hidden md:block [text-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]">
            Advanced filters for Rust servers. Browse, search, find, sort
          </h3>
        </div>
      </Link>
      <div>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-gray-200 m-1 sm:m-0.5 [text-shadow:_2px_2px_2px_rgb(0_0_0_/_60%)] font-rust tracking-[0.100rem] text-center px-1 mx-4 rounded sm:w-30 text-lg md:text-lg transition-all cursor-pointer hover:text-white block"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </header>
  );
}

export default Header;
