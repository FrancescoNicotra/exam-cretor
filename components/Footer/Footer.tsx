import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        Powered by{" "}
        <Link
          href="https://github.com/FrancescoNicotra"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Francesco Nicotra
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
