import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-6">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 md:px-8">
        <Link href="/" passHref>
          <div className="flex items-center w-[150px]">
            <Image
              src="/logo.svg"
              alt="Videx Logo"
              width={200}
              height={150}
              priority
              className="w-full h-auto"
            />
          </div>
        </Link>
        <div>
          <Link href="/" passHref>
            <button className="text-black px-4 py-2">Home</button>
          </Link>
          <Link href="/video-list" passHref>
            <button className="text-black px-4 py-2">List of Video</button>
          </Link>
        </div>
        <div>
          <Link href="/" passHref>
            <Button>Go to Github source</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
