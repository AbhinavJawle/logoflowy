"use client";

import React, { useEffect, useState } from "react";
import type { FormData } from "../create/page";
import { UserDetailContext } from "../_context/UserDetailContext";
import { useContext } from "react";
import Prompt from "../_data/Prompt";
import { AIDesignLogoGenerate } from "@/configs/Aimodels";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import { renderToString } from "react-dom/server";
import { Navbar } from "../(components)/navbar";

import type { Metadata } from "next";
import type { Logo } from "@/app/(types)/logo";
import { LogoListGroup } from "../(components)/logo-list-group";
import { generateGoogleFont } from "@/app/(utils)/generate-google-font";
import { BASE_URL } from "@/lib/config";
import allLogos from "@/app/(data)/logos.json";

function CreateLogo() {
  const [data, setData] = useState<Logo[]>(() => allLogos);
  const googleFontUrl = generateGoogleFont(data);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState<FormData>();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState("");
  const [svgIcon, setSvgIcon] = useState("");

  useEffect(() => {
    if (typeof window != undefined && userDetail?.email) {
      const storage = localStorage.getItem("formData");

      if (storage) {
        setFormData(JSON.parse(storage));
      }
    }
  }, [userDetail]);

  useEffect(() => {
    if (formData?.logoTitle) {
      generateAILogo();
    }
  }, [formData?.logoTitle]);

  const generateAILogo = async () => {
    if (userDetail?.credits <= 0) {
      toast("Not Enough Credits");
      console.log("NO CREDITS");
      return 0;
    }
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace(
      "{logoTitle}",
      formData?.logoTitle ?? ""
    )
      .replace("{logoDesc}", formData?.desc ?? "")
      .replace("{logoColor}", formData?.palette ?? "")
      .replace("{logoDesign}", formData?.design?.title ?? "")
      .replace("{logoPrompt}", formData?.design?.prompt ?? "")
      .replace("{logoIdea}", formData?.idea ?? "")
      .replace("{logoSimplicity}", formData?.simplicity?.prompt ?? "")

      .replace("{logoTone}", formData?.logoTone?.title || "");

    console.log("PROMPT", PROMPT);

    //generate image
    const result = await axios.post("/api/ai-logo-model-replicate", {
      prompt: PROMPT,
      email: userDetail?.email,
      title: formData?.logoTitle,
      desc: formData?.desc,
      userCredits: userDetail?.credits,
    });

    console.log("aiPROMPT", result.data.aiprompt);

    console.log("SVG data received:", result.data.svgIcon ? "Yes" : "No");
    console.log(
      "SVG content sample:",
      result.data.svgIcon
        ? result.data.svgIcon.substring(0, 100) + "..."
        : "None"
    );

    // If we have SVG data, use it, otherwise fall back to image URL if present
    if (result.data.svgIcon) {
      setSvgIcon(result.data.svgIcon);
      setLogoImage(result.data.image); // Still set the image for preview
    } else if (result.data.image) {
      setLogoImage(result.data.image);
    }
    if (userDetail?.email && userDetail?.name) {
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: userDetail.email,
            userName: userDetail.name,
          }),
        });
        const data = await res.json();
        if (data && !data.error) {
          setUserDetail((prev: any) => ({ ...prev, ...data }));
        }
      } catch (err) {
        // Optionally log error or show toast
        console.error("Failed to refresh user details", err);
      }
    }
    setLoading(false);

    const SVGComponent = (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={400}
        height={400}
        viewBox="0 0 256 256"
        {...props}
      >
        {logoImage ? (
          <image href={logoImage} width="100%" height="100%" />
        ) : null}
      </svg>
    );

    // Update all logos in the data to include the image URL
    if (result.data.image) {
      console.log("Using image URL for logos");

      setData((prevData) => {
        // Create a deep copy of the data
        const newData = [...prevData];
        // Add image URL to all logos
        return newData.map((logo) => ({
          ...logo,
          imageUrl: result.data.image,
        }));
      });
    }
  };

  const handleDownload = async () => {
    if (!logoImage) return;
    try {
      const response = await fetch(logoImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ai-logo.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("SVG Icon", svgIcon);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="w-60 flex justify-center mb-4">
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="rounded-md shadow-sm cursor-pointer"
          >
            <LayoutDashboard className="cursor-" />
          </Button>
        </Link>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <Loader2 className="animate-spin text-primary w-12 h-12 mb-2" />
          <span className="text-lg font-medium text-muted-foreground">
            Generating logo...
          </span>
        </div>
      ) : (
        logoImage && (
          <>
            <Image
              src={logoImage}
              alt={"logoImage"}
              width={240}
              height={240}
              className="rounded-lg border shadow-md"
            />
            <div className="w-60 flex justify-center mt-4">
              <Button
                onClick={handleDownload}
                variant="default"
                className="cursor-pointer"
              >
                Download Logo
              </Button>
            </div>
          </>
        )
      )}
      {/* AI-generated logo display */}

      <link rel="stylesheet" href={googleFontUrl} />
      <Navbar />
      {/* Wrap LogoListGroup in a centering container */}
      <div className="flex justify-center items-start pt-10">
        <LogoListGroup items={data} companyName={formData?.logoTitle} />
      </div>
    </div>
  );
}

export default CreateLogo;
