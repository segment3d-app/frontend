import { storageAxios } from "@/utils/axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  try {
    const res = await storageAxios.post("/upload", form);
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error.response ? error.response.status : 500,
    });
  }
}
