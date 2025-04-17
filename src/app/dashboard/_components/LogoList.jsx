"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import Link from "next/link";
import Image from "next/image";

function LogoList() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [logoList, setLogoList] = useState();
  useEffect(() => {
    userDetail && GetUserLogos();
  }, [userDetail]);
  const GetUserLogos = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userDetail?.email, "logos")
    );
    setLogoList([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setLogoList((prev) => [...prev, doc.data()]);
    });
  };

  const ViewLogo = (image) => {};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Your Logos
      </h1>
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
        {logoList?.length > 0
          ? logoList.map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg transition-all hover:scale-105 p-2 cursor-pointer"
                onClick={() => ViewLogo(logo?.image)}
              >
                <Image
                  src={logo?.image}
                  alt={"LogoImage"}
                  height={224}
                  width={224}
                  className="rounded-md object-cover w-56 h-56"
                />
                <h2 className="mt-2 text-base font-medium text-gray-700 truncate w-40 text-center">
                  {logo?.title}
                </h2>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 animate-pulse rounded-xl w-full h-[300px]"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default LogoList;
