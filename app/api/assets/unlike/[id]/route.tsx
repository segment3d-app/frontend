import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const res = await serverAxios.post(
      `/api/assets/unlike/${params.id}`,
      null,
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
