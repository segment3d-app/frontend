"use client";

import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
import { useEffect, useState } from "react";

const Viewer: React.FC = () => {
  const [view, setView] = useState<any | null>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const viewerInstance = new GaussianSplats3D.Viewer({
        cameraUp: [0, 1, 0],
        initialCameraPosition: [1, 0, 0],
        initialCameraLookAt: [0, 0, 0],
      });
      setView(viewerInstance);
    }
  }, []);

  useEffect(() => {
    if (view) {
      view
        .addSplatScene(
          "https://storage.googleapis.com/segment3d-app/test.ply",
          {
            showLoadingSpinner: true,
          },
        )
        .then(() => {
          view.start();
        });
    }
  }, [view]);

  return <></>;
};

export default Viewer;
