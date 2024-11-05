import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/config";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const file: File | null = data.get("file") as unknown as File;

    const uploadData = await pinata.upload
      .file(file)
      .group("0192fbf8-05f3-77b6-8573-d9609e1c0967");

    const url = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.cid}`;

    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
