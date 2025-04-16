"use client";

import React, { useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import { useContext } from "react";
import Prompt from "../_data/Prompt";
import { AIDesignLogoGenerate } from "@/configs/Aimodels";
import axios from "axios";
import Image from "next/image";

function CreateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState();
  const [logoImage, setLogoImage] = useState("");

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
  }, [formData]);

  const generateAILogo = async () => {
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData.logoTitle)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData?.palette)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design.prompt)
      .replace("{logoIdea}", formData?.idea)
      .replace("{logoSimplicity}", formData?.simplicity.prompt)
      .replace("{logoSep}", formData?.logoSep.prompt)
      .replace("{logoOnly", formData?.logoOnly.prompt);

    console.log("PROMPT", PROMPT);

    //generate image
    const result = await axios.post("/api/ai-logo-model", {
      prompt: PROMPT,
      email: userDetail?.email,
      title: formData?.logoTitle,
      desc: formData?.desc,
    });
    console.log("RESULT DATA: " + result.data.images[0].url);

    setLoading(false);
    setLogoImage(result.data.images[0].url);
    // console.log("logoImage" + logoImage);

    //display image
  };

  return (
    <div>
      <h2>{loading && "Loading"}</h2>
      {!loading && (
        <Image src={logoImage} alt={"logoImage"} width={200} height={200} />
      )}
    </div>
  );
}

export default CreateLogo;
