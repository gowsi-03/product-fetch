"use client";

import { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 relative">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-white text-2xl font-bold">
            Logo
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link href="/products" className="text-white hover:text-gray-400">
            Products
          </Link>
          <Link href="/categories" className="text-white hover:text-gray-400">
            Categories
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-white hover:text-gray-400 focus:outline-none"
          >
            <span className="sr-only">Open menu</span>
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <Transition
        show={isOpen}
        enter="transition duration-300 ease-in-out transform"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition duration-300 ease-in-out transform"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-full"
      >
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          {/* Close Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl focus:outline-none"
            >
              &times;
            </button>
          </div>
          
          {/* Menu Items */}
          <div className="flex flex-col items-center justify-center h-full text-white">
            <Link href="/products" className="py-4 text-2xl hover:text-gray-400">
              Products
            </Link>
            <Link href="/categories" className="py-4 text-2xl hover:text-gray-400">
              Categories
            </Link>
          </div>
        </div>
      </Transition>
    </nav>
  );
}
