import Link from "next/link";

const navItems = [
  { href: "/gallery", label: "Gallery" },
  { href: "/behind-the-image", label: "Behind the Image" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/store", label: "Store" },
];

export function Navigation() {
  return (
    <nav>
      <ul className="flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
