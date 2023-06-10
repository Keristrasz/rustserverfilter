import React from "react";
import Image from "next/image";

function Header() {
  return (
    <header className="flex justify-start items-center w-full bg-rustOne px-4">
      <Image src="/logo-small.jpg" width={100} height={100} alt="heading logo" />
      <div>
        <h2 className="font-extrabold text-4xl tracking-tight">RUST SERVER FILTER</h2>
        <h3>Place where you can find your solo duo trio rust servers</h3>
      </div>
    </header>
  );
}

export default Header;
