"use server";

import { Tag } from "@/model/tag";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";

export async function getAllTag(
  keyword: string,
  limit: number,
): Promise<Tag[]> {
  "use server";

  try {
    const { data } = await serverAxios.get<{ tags: Tag[] }>(
      `/api/tags/search?keyword=${keyword}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      },
    );
    return data.tags;
  } catch (error: any) {
    throw error;
  }
}
