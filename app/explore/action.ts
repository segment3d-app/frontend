"use server";

import { CreateAssetRequest, CreateAssetResponse } from "@/dao/createAsset";
import { Asset } from "@/model/asset";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";

export async function getAllAsset(
  search: string,
  filter: string[],
): Promise<Asset[]> {
  "use server";
  try {
    const params = new URLSearchParams();

    if (search) {
      params.append("keyword", search);
    }

    if (filter?.length) {
      params.append("filter", filter.join(","));
    }

    let url = `/api/assets?${params.toString()}`;

    const { data } = await serverAxios.get<{ assets: Asset[] }>(url, {
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    });

    return data.assets;
  } catch (error) {
    throw error;
  }
}

export async function createAsset(
  req: CreateAssetRequest,
): Promise<CreateAssetResponse> {
  "use server";
  try {
    let url = `/api/assets`;

    const { data } = await serverAxios.post<{ asset: Asset; message: String }>(
      url,
      req,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
}
