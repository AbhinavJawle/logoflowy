"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const { user } = useUser();
  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-white shadow-sm">
      <div className="flex items-center">
        <Image
          src="/logo.svg"
          alt="LogoFlowy Logo"
          width={150}
          height={50}
          className="object-contain h-8 md:h-10"
          priority
        />
      </div>
      <nav className="flex items-center space-x-2 md:space-x-4">
        {user ? (
          <Button variant={"outline"} className="cursor-pointer">
            Dashboard
          </Button>
        ) : (
          <Button asChild>
            <Link href="/create">Get Started</Link>
          </Button>
        )}

        <UserButton />
      </nav>
    </header>
  );
}

export default Header;
