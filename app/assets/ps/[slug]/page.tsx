import PointCloudViewer from "@/components/viewer/ply-loader";
import { getAssetDetails } from "../../action";

export default async function RenderAsset({
  params,
}: {
  params: { slug: string };
}) {
  const asset = await getAssetDetails(params.slug);
  const url = asset.segmentedPclDirUrl;
  return (
    <PointCloudViewer
      plyFilePath={`${process.env.NEXT_PUBLIC_API_STORAGE}${url}`}
    />
  );
}
