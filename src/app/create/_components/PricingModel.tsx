"use client";
import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function PricingModel({
  onHandleInputChange,
  formData,
}: {
  onHandleInputChange: (value: string) => void;
  formData: any;
}) {
  const [selectedPlan, setSelectedPlan] = useState("");
  const { user } = useUser();
  useEffect(() => {
    if (formData?.logoTitle && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <div className="max-w-6xl mx-auto mb-4 px-4">
      <HeadingDescription
        title={"Select your AI Model Plan"}
        description={"Generate Unlimted Fast Logo with your fav model."}
      />

      <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
        {Lookup.pricingOption.map((plan, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 lg:p-8 flex flex-col items-center w-full flex-1 relative hover:shadow-md transition-shadow"
            onClick={() => setSelectedPlan(plan.title)}
          >
            <div className="mb-4">
              <Image src={plan.icon} alt={plan.title} width={70} height={70} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {plan.title}
            </h2>
            <div className="space-y-4 mb-8 w-full">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {user ? (
              <Link href={"/create-logo?type=" + plan.title}>
                <button className="mt-auto py-2 px-8 bg-primary text-white rounded-md font-medium cursor-pointer hover:bg-primary/90 transition-colors">
                  {plan.button}
                </button>
              </Link>
            ) : (
              <SignInButton
                mode="modal"
                forceRedirectUrl={"/create-logo?type=" + plan.title}
              >
                <button className="mt-auto py-2 px-8 bg-primary text-white rounded-md font-medium cursor-pointer hover:bg-primary/90 transition-colors">
                  {plan.button}
                </button>
              </SignInButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingModel;
