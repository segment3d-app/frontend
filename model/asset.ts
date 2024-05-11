import { User } from "./user";

export interface Asset {
  id: string;
  title: string;
  slug: string;
  type: string;
  thumbnailUrl: string;
  photoDirUrl: string;
  splatUrl: string;
  pclUrl: string;
  pclColmapUrl: string;
  segmentedPclDirUrl: string;
  segmentedSplatDirUrl: string;
  isPrivate: boolean;
  status: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  isLikedByMe: boolean;
}
