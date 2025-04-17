// import { NextRequest, NextResponse } from "next/server";
// import { AIDesignLogoGenerate } from "@/configs/Aimodels";
// import axios from "axios";
// import { Buffer } from "buffer";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "@/configs/FirebaseConfig";

// export async function POST(req: NextRequest) {
//   const { prompt, email, title, desc } = await req.json();

//   try {
//     const AiPromptResult = await AIDesignLogoGenerate.sendMessage({
//       message: prompt,
//     });
//     if (!AiPromptResult.text) {

//     const response = await axios.post(
//       "https://fal.run/fal-ai/flux/schnell",
//       AiPrompt,
//       {
//         headers: {
//           // Authorization: "Bearer " + process.env.HUGGING_FACE_API,
//           Authorization: "Key " + process.env.FAL_API_KEY,

//           "Content-Type": "application/json",
//           // "Content-Type": "text/plain",
//         },
//         responseType: "arraybuffer",
//       }
//     );

//     const buffer = Buffer.from(response.data, "binary");
//     const base64Image = buffer.toString("base64");

//     const base64ImageWithMime = `data:image/png;base64,${base64Image}`;
//     console.log(base64ImageWithMime);

//     try {
//       await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
//         image: base64ImageWithMime,
//         title: title,
//         desc: desc,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     // return NextResponse.json(AiPrompt);
//     return NextResponse.json({ image: base64ImageWithMime });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "Failed to generate logo", details: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { AIDesignLogoGenerate } from "@/configs/Aimodels";
import axios from "axios";
import { Buffer } from "buffer";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

export async function POST(req: NextRequest) {
  const { prompt, email, title, desc, userCredits } = await req.json();

  try {
    const AiPromptResult = await AIDesignLogoGenerate.sendMessage({
      message: prompt,
    });
    if (!AiPromptResult.text) {
      return NextResponse.json(
        { error: "AI response text is undefined" },
        { status: 500 }
      );
    }
    const AiPrompt = JSON.parse(AiPromptResult.text);

    const response = await axios.post(
      "https://fal.run/fal-ai/flux/schnell",
      AiPrompt,
      {
        headers: {
          // Authorization: "Bearer " + process.env.HUGGING_FACE_API,
          Authorization: "Key " + process.env.FAL_API_KEY,

          "Content-Type": "application/json",
          // "Content-Type": "text/plain",
        },
      }
    );

    const imageAIUrl = response.data.images[0].url;

    try {
      const docRef = doc(db, "users", email);

      await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
        image: imageAIUrl,
        title: title,
        desc: desc,
      });

      await updateDoc(docRef, {
        credits: Number(userCredits) - 1,
      });
    } catch (error) {
      console.log(error);
    }
    // return NextResponse.json(AiPrompt);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error);
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return NextResponse.json(
      { error: "Failed to generate logo", details: errorMessage },
      { status: 500 }
    );
  }
}
