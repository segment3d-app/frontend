import PointCloudViewer from "@/components/viewer/ply-loader";

export default function RenderAsset() {
  return <PointCloudViewer plyFilePath="/sample/dragon.ply" />;
}
