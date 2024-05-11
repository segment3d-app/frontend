import { Asset } from "@/model/asset";

export interface CreateAssetRequest {
  isPrivate: boolean;
  pclUrl?: string;
  photoDirUrl: string;
  tags: string[];
  title: string;
  type: "lidar" | "non_lidar";
}

export interface CreateAssetResponse {
  asset: Asset;
  message: String;
}
