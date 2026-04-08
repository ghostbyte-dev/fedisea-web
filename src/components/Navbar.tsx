"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <div className="w-full bg-primary/5 border-b border-primary/20">
        <div className="py-6 flex justify-between items-center my-container">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1">
            <div className="w-10 h-9 relative">
              <Image src="/logo.svg" alt="" fill />
            </div>
            <span className="text-3xl font-black">
              <span>Fedi</span>
              <span className="text-primary">Sea</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            <Link href="/servers">Servers</Link>
            <Link href="/software">Software</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/crawler">Crawler</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden px-4 pb-4 space-y-3 flex flex-col">
            <Link href="/servers" onClick={() => setOpen(false)}>
              Servers
            </Link>
            <Link href="/software" onClick={() => setOpen(false)}>
              Software
            </Link>
            <Link href="/docs" onClick={() => setOpen(false)}>
              Docs
            </Link>
            <Link href="/crawler" onClick={() => setOpen(false)}>
              Crawler
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
