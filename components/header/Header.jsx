import Image from "next/image";
import globals from "../../app/globals.css";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-black">
      <nav className="flex items-center justify-between w-full max-w-3xl mx-auto">
        <figure className="flex items-center space-x-2">
            <Image src="/assets/logo.png" alt="Logo" className="w-10 h-10" width={32} height={32} />
            <figcaption className="font-size-large text-black dark:text-gray-400">Foreningen for dyrevelfærd</figcaption>
        </figure>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="font-size-large">
              Hjem
            </a>
          </li>
          <li>
            <a href="/about" className="font-size-large text-black hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
              Bliv frivlillig
            </a>
          </li>
          <li>
            <a href="/contact" className="font-size-large text-black hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
              Adopter et dyr
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}