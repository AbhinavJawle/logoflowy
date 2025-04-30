"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import Image from "next/image"; // Keep for potential fallback/loading
import { Loader2 } from "lucide-react";
import { Navbar } from "@/app/(components)/navbar"; // Added
import { LogoListGroup } from "@/app/(components)/logo-list-group"; // Added
import { generateGoogleFont } from "@/app/(utils)/generate-google-font"; // Added
import allLogos from "@/app/(data)/logos.json"; // Added base structure
import type { Logo } from "@/app/(types)/logo"; // Added

// Firestore data structure (adjust if needed)
interface FetchedLogoData {
  image: string;
  title: string;
  desc?: string; // Optional description
}

function LogoDetailPage() {
  const params = useParams();
  const logoId = params.logoId as string;
  const { userDetail } = useContext(UserDetailContext);
  const [logoItem, setLogoItem] = useState<Logo | null>(null); // State for the single Logo object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndPrepareLogo = async () => {
      if (!userDetail?.email || !logoId) {
        if (!logoId) setError("Logo ID is missing.");
        // Keep loading until we have user/id
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "users", userDetail.email, "logos", logoId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fetchedData = docSnap.data() as FetchedLogoData;
          console.log("Fetched data:", fetchedData);
          // Use the structure from logos.json[0] as a base
          const baseLogo = { ...allLogos[0] };
          // Create the single Logo object for LogoListGroup
          const preparedLogo: Logo = {
            ...baseLogo, // Spread base properties (styles, iconName etc.)
            id: logoId, // Use the actual logoId
            imageUrl: fetchedData.image, // Use fetched image URL
            svgContent: undefined,
            companyName: fetchedData.title, // Use fetched title
          };
          console.log("Prepared logo:", preparedLogo);
          setLogoItem(preparedLogo);
        } else {
          setError("Logo not found.");
          setLogoItem(null);
        }
      } catch (err) {
        console.error("Error fetching logo data:", err);
        setError("Failed to fetch logo data.");
        setLogoItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAndPrepareLogo();
  }, [logoId, userDetail]);

  // Generate Google Font URL based on the *single* logo item if it exists
  // Note: This might need adjustment if you want the font selector
  // in Navbar to dynamically change this based on its own state.
  // For now, it uses the font from the base structure (logos.json[0])
  const googleFontUrl = logoItem ? generateGoogleFont([logoItem]) : "";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!logoItem) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Logo could not be loaded.</p>
      </div>
    );
  }

  // Render Navbar and LogoListGroup with the single prepared logo item
  return (
    console.log("logoItem", logoItem),
    (
      <div>
        {googleFontUrl && <link rel="stylesheet" href={googleFontUrl} />}
        <Navbar />
        {/* Wrap LogoListGroup in a centering container */}
        <div className="flex justify-center items-start pt-10">
          {/* Pass the single logo item in an array */}
          <LogoListGroup
            items={[logoItem]}
            companyName={logoItem.companyName || "dummylogo"}
          />
        </div>
      </div>
    )
  );
}

export default LogoDetailPage;
