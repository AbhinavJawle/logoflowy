"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function Info() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  // const getUserCredits = async () => {
  //   const responseCredit = await userDetail?.credits;
  //   setUserDetail({
  //     ...userDetail,
  //     credits: responseCredit,
  //   });
  // };

  // useEffect(() => {
  //   getUserCredits();
  // }, []);
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow p-6 mt-6 mb-10">
      <div className="flex items-center justify-between w-full">
        <div className="grid grid-cols-1 gap-2 sm:flex sm:items-center sm:space-x-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Hello, {userDetail?.name}
          </h2>
          <span className="bg-blue-50 text-blue-700 font-semibold px-3 py-1.5 rounded-md text-base shadow-sm min-w-0 sm:min-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis">
            Credits Left: {userDetail?.credits}
          </span>
        </div>
        <Link href={"/create"}>
          <Button
            variant={"default"}
            className="px-6 py-2 font-medium cursor-pointer shadow"
          >
            Create Logo
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Info;
