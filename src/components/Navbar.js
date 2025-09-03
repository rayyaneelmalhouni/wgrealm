"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className=" py-3  border-gray-200 relative z-30 bg-secondary/15 flex justify-center">
      <div className="flex justify-between items-center max-w-6xl w-full px-5 md:px-8 lg:px-12 ">
        {/* Navbar Title */}
        <Link className="cursor-pointer" href={"/"}>
          <h3 className=" text-xl  z-40 relative font-dmSerifText text-secondary">
            <span className="text-primary">WG</span>realm
          </h3>
        </Link>
        <div className="flex justify-between items-center ">
          {/* Burger Icon */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-40 relative cursor-pointer"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-800 mb-1 transition-all ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-800 mb-1 transition-all ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all ${
                menuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            ></span>
          </button>
          {/* Login Button - always on the right */}

          {/* Overlay Menu */}
          {menuOpen && (
            <div
              className="
            fixed inset-0 top-0 left-0 w-full h-full bg-white flex flex-col justify-center items-center gap-8
            z-30 transition-all
            md:hidden
          "
            >
              <div className="flex flex-col items-center gap-16 ">
                <Link
                  href="/"
                  className="text-gray-800 text-2xl no-underline font-poppins hover:text-primary "
                  onClick={() => setMenuOpen(false)}
                >
                  Our Story
                </Link>
                <Link
                  href="/blogs/ghita"
                  className="text-gray-800 text-2xl font-poppins no-underline hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Blogs
                </Link>
                <Link
                  href="/books"
                  className="text-gray-800 text-2xl font-poppins  no-underline hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Books
                </Link>
                <Link
                  href="/contactus"
                  className="text-gray-800 text-2xl font-poppins  no-underline hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
          {/* Desktop Menu */}
          <div
            className="
          hidden md:flex md:items-center md:gap-6 md:ml-8
        "
          >
            <Link
              href="/"
              className="text-gray-800 text-base no-underline hover:text-blue-600"
            >
              Our Story
            </Link>
            <Link
              href="/blogs/ghita"
              className="text-gray-800 text-base no-underline hover:text-blue-600"
            >
              Blogs
            </Link>
            <Link
              href="/books"
              className="text-gray-800 text-base no-underline hover:text-blue-600"
            >
              Books
            </Link>
            <Link
              href="/contactus"
              className="text-gray-800 text-base no-underline hover:text-blue-600"
            >
              Contact Us
            </Link>
          </div>
          {/* Login Button for mobile (always on right) */}
          {session ? (
            <div className="flex items-center">
              <button
                className="ml-4 px-2 py-0.5 bg-secondary text-white rounded text-sm sm:px-4 sm:py-1 sm:text-lg
         hover:bg-secondary/70 transition z-40 relative font-poppins cursor-pointer"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
              <Image
                src={session.user.image}
                className="w-10 h-10 rounded-full ml-4"
                width={40}
                height={40}
                alt="User Profile"
              />
            </div>
          ) : (
            <button
              className="ml-4 px-2 py-0.5 bg-secondary text-white rounded 
         hover:bg-secondary/70 transition z-40 relative font-poppins cursor-pointer sm:px-4 sm:py-1 sm:text-lg"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
