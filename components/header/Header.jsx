import Image from "next/image";
import globals from "../../app/globals.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-black">
      <nav className="flex items-center justify-between w-full mx-auto container">
        <figure className="flex items-center space-x-2">
            <Link href="/"><Image src="/assets/logo.png" alt="Logo" className="w-10 h-10" width={32} height={32} /></Link>
            <Link href="/"><figcaption className="font-size-large text-black dark:text-gray-400">Foreningen for dyrevelfærd</figcaption></Link>
        </figure>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="font-size-large">
              Hjem
            </Link>
          </li>
          <li>
            <Link href="/blivFrivillig" className="font-size-large text-black hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
              Bliv frivillig
            </Link>
          </li>
          <li>
            <Link href="/adopterEtDyr" className="font-size-large text-black hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
              Adopter et dyr
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}