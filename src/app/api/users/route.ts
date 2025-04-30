import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import defaultCredits from "@/app/_data/defaultCredits";
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { userEmail, userName } = await req.json();
  try {
    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      //New user
      const data = {
        name: userName,
        email: userEmail,
        credits: defaultCredits.defaultCredits,
      };
      await setDoc(doc(db, "users", userEmail), { ...data });
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
