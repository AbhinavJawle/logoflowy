"use client";

import React, { useState } from "react";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function Hero() {
  const [logoTitle, setLogoTitle] = useState("");
  return (
    <section className="py-16 md:py-24 lg:py-32">
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
              className="w-full h-14 text-lg px-6 rounded-md focus-visible:ring-offset-0 focus-visible:ring-1 placeholder:text-lg"
              onChange={(e) => setLogoTitle(e?.target.value)}
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
