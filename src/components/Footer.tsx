"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <section className="bg-primary-dark text-white pt-20 flex flex-col justify-center border-t-border border-t">
      <div className="my-container">Footer</div>

      <div className="border-t-2 border-t-[#24607d] w-full flex justify-center text-center py-4">
        <Link
          href="https://ghostbyte.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold"
        >
          A Ghostbyte Production
        </Link>
      </div>
    </section>
  );
};

export default Footer;
