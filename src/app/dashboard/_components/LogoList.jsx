"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import React, { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function LogoList() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [logoList, setLogoList] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};

    if (userDetail?.email) {
      const q = collection(db, "users", userDetail.email, "logos");

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const logos = [];
        querySnapshot.forEach((doc) => {
          logos.push({ id: doc.id, ...doc.data() });
        });
        setLogoList(logos);
      }, (error) => {
        console.error("Error listening to logo updates:", error);
        setLogoList([]);
      });
    }

    return () => unsubscribe();
  }, [userDetail]);

  const handleDownload = async (imageUrl) => {
    if (!imageUrl) return;
    setDownloading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ai-logo.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
    setDownloading(false);
  };

  const ViewLogo = (image) => setModalImage(image);
  const CloseModal = () => setModalImage(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Your Logos
      </h1>
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
        {logoList?.length > 0
          ? logoList.map((logo) => (
              <Link key={logo.id} href={`/logo-detail/${logo.id}`} passHref>
                <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg transition-all hover:scale-105 p-2 cursor-pointer">
                  {logo?.svg ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: logo.svg }}
                      className="rounded-md w-56 h-56 flex items-center justify-center"
                    />
                  ) : (
                    <Image
                      src={logo?.image}
                      alt={"LogoImage"}
                      height={224}
                      width={224}
                      className="rounded-md object-cover w-56 h-56"
                    />
                  )}
                  <h2 className="mt-2 text-base font-medium text-gray-700 truncate w-40 text-center">
                    {logo?.title}
                  </h2>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 animate-pulse rounded-xl w-full h-[300px]"
              ></div>
            ))}

        {logoList?.length === 0 && (
          <h2 className="text-base font-medium text-gray-700">
            No Logos Found
          </h2>
        )}
      </div>
      {/* Modal Implementation */}
      {modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Glassy backdrop for modal, keeps page visible but blurs/dims */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/40 transition-all duration-300" />
          <div
            className="relative bg-white/80 border border-gray-200 rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-[96vw] max-h-[98vh] backdrop-blur-xl"
            style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)" }}
          >
            {typeof modalImage === "string" && modalImage.startsWith("<svg") ? (
              <div
                dangerouslySetInnerHTML={{ __html: modalImage }}
                className="rounded-xl max-h-[70vh] max-w-full mb-4 w-[360px] h-[360px] flex items-center justify-center"
              />
            ) : (
              <Image
                src={modalImage?.image || modalImage}
                alt={modalImage?.title || "Logo Preview"}
                width={360}
                height={360}
                className="rounded-xl object-contain max-h-[70vh] max-w-full mb-4"
              />
            )}
            <h2 className="text-2xl font-bold text-gray-900 text-center w-full truncate mb-1">
              Logo Preview
            </h2>
            <div className="mb-6 text-base font-medium text-gray-700 text-center w-full truncate">
              {modalImage?.title || ""}
            </div>
            <div className="flex gap-4 w-full justify-center mt-2">
              <Button
                onClick={() => handleDownload(modalImage?.image || modalImage)}
                className="px-6 py-2 text-white font-semibold shadow duration-200 cursor-pointer disabled:opacity-60"
                disabled={downloading}
                variant={"default"}
              >
                {downloading ? "Downloading..." : "Download"}
              </Button>
              <Button
                onClick={CloseModal}
                className="px-6 py-2font-semibold shadow transition-colors duration-200 cursor-pointer"
                variant={"outline"}
              >
                Return
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogoList;
