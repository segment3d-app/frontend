import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const res = await serverAxios.post("/api/assets", data, {
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    });
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error.response ? error.response.status : 500,
    });
  }
}

export async function GET() {
  try {
    const res = await serverAxios.get("/api/assets", {
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    });
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error.response ? error.response.status : 500,
    });
  }
}
