"use client";

import React, { Children, useEffect, useState } from "react";
import Header from "./_components/Header";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Footer } from "./_components/Footer";

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
        <main className="flex-grow container mx-auto px-0 md:px-0 py-1 md:py-1">
          {children}
        </main>
        <Footer />
      </div>
    </UserDetailContext.Provider>
  );
}

export default Provider;
