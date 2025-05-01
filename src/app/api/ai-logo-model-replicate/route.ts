import { NextRequest, NextResponse } from "next/server";
import { AIDesignLogoGenerate } from "@/configs/Aimodels";
import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import Replicate from "replicate";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  const { prompt, email, title, desc, userCredits } = await req.json();

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

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
    let AiPrompt = AiPromptResult.text;
    try {
      // Try to parse as JSON if it's a JSON string
      AiPrompt = JSON.parse(AiPromptResult.text);
    } catch (parseError) {
      // If not JSON, keep the raw text
      console.log("AI response is not JSON, using raw text:", AiPromptResult.text);
    }

    const input = {
      prompt: AiPromptResult.text,
      go_fast: false,
      megapixels: "1",
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "png",
      output_quality: 100,
      num_inference_steps: 4,
    };

    // "recraft-ai/recraft-20b-svg",

    const response: any = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input,
      }
    );

    console.log("URL011", response[0].url().href); //=> "http://example.com"

    const imageAIUrl = response[0].url().href;
    let cleanedImageUrl = imageAIUrl;
    let svgIcon: any;
    try {
      const uploadResult = await cloudinary.uploader.upload(imageAIUrl, {
        transformation: [
          { effect: "background_removal" },
          { effect: "vectorize:detail:1.0:corners:40:colors:3" },
        ],
        format: "svg",
      });
      cleanedImageUrl = uploadResult.secure_url;
      svgIcon = await axios.get(`${cleanedImageUrl}`);
      console.log("SVG Icon", svgIcon.data);
      console.log("cleanedImageUrl", cleanedImageUrl);
    } catch (err) {
      console.error("Cloudinary background removal error:", err);
    }
    // const imageAIUrl = response.data.output[0];

    try {
      const docRef = doc(db, "users", email);

      await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
        title: title,
        desc: desc,
        aiprompt: AiPromptResult.text,
        createdAt: Date.now(),
        image: cleanedImageUrl,
        svgIcon: svgIcon.data,
        pngImage: imageAIUrl,
      });

      await updateDoc(docRef, {
        credits: Number(userCredits) - 1,
      });
    } catch (error) {
      console.log(error);
    }
    // return NextResponse.json(AiPrompt);
    // return NextResponse.json(response);
    return NextResponse.json({
      image: cleanedImageUrl,
      svgIcon: svgIcon.data,
      aiprompt: AiPromptResult.text,
    });
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
