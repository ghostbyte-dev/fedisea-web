"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div className="w-full py-4 px-4 bg-primary text-white font-bold flex items-center justify-center text-center">
        ⚠️ This project is still in development, so don't expect a finished
        product ⚠️
      </div>
      <section className="py-6 space-x-4 flex flex-row justify-center">
        <Link href="/">Home</Link>
        <Link href="/servers">Servers</Link>
        <Link href="/software">Software</Link>
        <Link href="/docs">Docs</Link>
        <Link href="/crawler">Crawler</Link>
      </section>
    </div>
  );
};

export default Navbar;
