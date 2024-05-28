"use client";

import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
import { useEffect, useState } from "react";

interface ViewerProps {
  splatUrl: string;
}

const Viewer: React.FC<ViewerProps> = ({ splatUrl }) => {
  const [view, setView] = useState<any | null>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const viewerInstance = new GaussianSplats3D.Viewer({
        cameraUp: [0, 1, 0],
        initialCameraPosition: [1, 0, 0],
        initialCameraLookAt: [0, 0, 0],
        sharedMemoryForWorkers: false,
      });
      setView(viewerInstance);
    }
  }, []);

  useEffect(() => {
    if (view) {
      view
        .addSplatScene(splatUrl, {
          showLoadingSpinner: true,
        })
        .then(() => {
          view.start();
        });
    }
  }, [view]);

  return <></>;
};

export default Viewer;
