"use client";

import React from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import { useContext } from "react";

function CreateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return <div>CreateLogo</div>;
}

export default CreateLogo;
