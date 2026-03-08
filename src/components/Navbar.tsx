"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <section className="py-6 space-x-4 flex flex-row justify-center">
      <Link href="/">Home</Link>
      <Link href="/servers">Servers</Link>
      <Link href="/software">Software</Link>
      <Link href="/docs">Docs</Link>
      <Link href="/crawler">Crawler</Link>
    </section>
  );
};

export default Navbar;
