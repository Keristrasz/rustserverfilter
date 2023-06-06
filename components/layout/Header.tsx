import React from "react";
import Image from "next/image";

function Header() {
  return (
    <header className="flex justify-center items-center w-full bg-rustOne">
      <Image src="/logo-small.jpg" width={100} height={100} alt="heading logo" />
      <h2 className="font-extrabold text-6xl tracking-tight">HEADING</h2>
    </header>
  );
}

export default Header;
