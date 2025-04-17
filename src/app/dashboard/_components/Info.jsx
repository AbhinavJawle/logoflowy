"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function Info() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow p-6 mt-6 mb-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Hello, {userDetail?.name}
          </h2>
          <span className="bg-blue-50 text-blue-700 font-semibold px-3 py-1.5 rounded-md text-base shadow-sm">
            Credits Left: {userDetail?.credits}
          </span>
        </div>
        <Link href={"/create"}>
          <Button className="px-6 py-2 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-colors duration-200 cursor-pointer">
            Create Logo
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Info;
