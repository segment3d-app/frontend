import { serverAxios } from "@/utils/axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const authorizationHeader = req.headers.get("Authorization");
  try {
    const res = await serverAxios.post("/api/assets", data, {
      headers: { Authorization: authorizationHeader },
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
    const res = await serverAxios.get("/api/assets");
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error.response ? error.response.status : 500,
    });
  }
}
