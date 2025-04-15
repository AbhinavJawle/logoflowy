"use client";

import React, { Children, useEffect, useState } from "react";
import Header from "./_components/Header";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
//Cliend-side file

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState();
  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = async () => {
    const result = await axios.post("/api/users", {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });

    console.log(result.data);
    setUserDetail(result.data);
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 md:px-6 py-8 md:py-12">
          {children}
        </main>
      </div>
    </UserDetailContext.Provider>
  );
}

export default Provider;
