"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <section className="bg-primary-dark text-white flex flex-col justify-center">
      <div className="w-full flex justify-center text-center py-4">
        <Link
          href="https://ghostbyte.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-md font-bold"
        >
          A Ghostbyte Production
        </Link>
      </div>
    </section>
  );
};

export default Footer;
