"use client";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div className="w-full py-4 px-4 bg-primary text-white font-bold flex items-center justify-center text-center">
        ⚠️ This project is still in development, so don't expect a finished
        product ⚠️
      </div>
      <div className="w-full bg-primary/5 border-b border-primary/20">
        <div className="py-6 space-x-4 flex flex-row justify-between items-center my-container">
          <Link href="/" className="flex items-center space-x-1">
            <div className="w-12 h-10 relative">
              <Image src="/surfboard-logo.svg" alt="" fill />
            </div>
            <span className="text-3xl font-black">
              <span>Fedi</span>
              <span className="text-primary">Sea</span>
            </span>
          </Link>

          <div className="space-x-4 flex flex-row">
            <Link href="/servers">Servers</Link>
            <Link href="/software">Software</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/crawler">Crawler</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
