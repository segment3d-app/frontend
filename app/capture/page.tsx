import Capture from "@/components/capture/capture";
import { Asset } from "@/model/asset";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CapturePage() {
  const { data } = await serverAxios.get<{ assets: Asset[] }>(
    "/api/assets/me",
    {
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    },
  );
  return <Capture assets={data.assets} />;
}
