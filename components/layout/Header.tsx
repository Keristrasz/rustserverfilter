import React from "react";
import Image from "next/image";

function Header() {
  return (
    <header className="flex justify-center w-full bg-rustOne">
      <Image src="/logo.jpg" width={150} height={150} alt="Picture of the author" />
      <h1 className="font-extrabold text-6xl mt-8 tracking-tight">HEADING</h1>
    </header>
  );
}

export default Header;
