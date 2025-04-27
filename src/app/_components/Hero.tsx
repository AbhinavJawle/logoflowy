"use client";

import React, { useState } from "react";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function Hero() {
  const [logoTitle, setLogoTitle] = useState<string>("");
  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen py-16 md:py-24 lg:py-32 bg-gradient-to-br from-purple-100 via-15% to-red-100">
      <div className="container mx-auto text-center space-y-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            {Lookup.HeroHeading}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-800">
            {Lookup.HeroSubheading}
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {Lookup.HeroDescription}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row max-w-lg mx-auto items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <Input
              placeholder="Enter your brand name"
              className="w-full h-14 text-lg px-6 rounded-md border !border-black !focus:border-black !focus-visible:border-black placeholder:text-lg placeholder:text-black"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLogoTitle(e.target.value)
              }
            />
          </div>

          <Link href={"/create?logoTitle=" + logoTitle}>
            <Button className="w-full sm:w-auto h-14 text-lg px-8 rounded-md shadow-sm cursor-pointer">
              Create
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
