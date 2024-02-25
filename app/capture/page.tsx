import Capture from "@/components/capture/capture";
import { getMyAsset } from "./action";

export const dynamic = "force-dynamic";

export default async function CapturePage() {
  const assets = await getMyAsset();
  return <Capture assets={assets} />;
}
