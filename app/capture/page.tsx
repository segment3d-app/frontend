import Capture from "@/components/capture/capture";
import { Asset } from "@/components/explore/explore";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";

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
