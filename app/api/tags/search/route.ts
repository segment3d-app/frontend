import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("keyword");
  const limit = searchParams.get("limit");

  try {
    const res = await serverAxios.get(
      `/api/tags/search?keyword=${keyword}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      },
    );
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error.response ? error.response.status : 500,
    });
  }
}
