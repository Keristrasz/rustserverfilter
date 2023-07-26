import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full flex justify-end bg-zinc-600 py-[0.41em] px-4 mt-auto left-0 bottom-0 h-8 ">
      <Link href="https://discord.gg/D6hF8hhBFj" target="_blank" rel="noopener noreferrer">
        <i className="text-sm text-right text-gray-200 hover:text-white">
          Do you like this site or you found a problem? Join our{" "}
          <strong className="font-semibold underline">Discord!</strong>
        </i>
      </Link>
    </footer>
  );
}

export default Footer;
