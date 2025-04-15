"use client";

import React, { useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import { useContext } from "react";
import Prompt from "../_data/Prompt";
import { AIDesignLogoGenerate } from "@/configs/Aimodels";
import axios from "axios";

function CreateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState();

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
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData.logoTitle)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData?.palette)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design.prompt)
      .replace("{logoIdea}", formData?.idea);

    console.log("PROMPT", PROMPT);

    //generate logo Prompt
    const result = await axios.post("/api/ai-logo-model", { prompt: PROMPT });
    console.log(result?.data);
    //generate logo Image
  };

  return <div>CreateLogo</div>;
}

export default CreateLogo;
