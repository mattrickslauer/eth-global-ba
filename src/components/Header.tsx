"use client";

import Link from "next/link";
import { AuthButton } from "@coinbase/cdp-react/components/AuthButton";

export default function Header() {
  return (
    <header className="siteHeader">
      <div className="siteHeaderInner">
        <Link href="/" className="siteHeaderBrand">
          BA Fan Brands
        </Link>
        <div className="siteHeaderActions">
          <AuthButton />
        </div>
      </div>
    </header>
  );
}


