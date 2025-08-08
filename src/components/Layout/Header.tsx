"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggler } from "@/components/theme-toggler";
import { TrendingUp } from "lucide-react";

const navigation = [
  { name: "Setup", href: "/setup" },
  { name: "Portfolio", href: "/portfolio" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-gray-950/9 0 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
              Portfolio Planner
            </span>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
