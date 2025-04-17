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
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="LogoFlowy Logo"
            width={150}
            height={50}
            className="object-contain h-8 md:h-10"
            priority
          />
        </Link>
      </div>
      <nav className="flex items-center space-x-2 md:space-x-4">
        {user ? (
          <Link href="/dashboard">
            <Button variant={"outline"} className="cursor-pointer">
              Dashboard
            </Button>
          </Link>
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
