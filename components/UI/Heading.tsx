import React from "react";
import Image from "next/image";

function Heading() {
  return (
    <div className="flex justify-center w-full bg-rustOne">
      <Image src="/logo.jpg" width={300} height={300} alt="Picture of the author" />

      <h1 className="font-extrabold text-6xl mt-8 tracking-tight">HEADING</h1>
    </div>
  );
}

export default Heading;
