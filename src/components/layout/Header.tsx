import Link from "next/link";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Shun&apos;s World
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
