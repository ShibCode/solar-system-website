import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import Lights from "./Lights";
import Planets from "./Planets";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useAttributes } from "../../context/AttributesProvider";

export const CAMERA_SIZE = 4;

const Experience = () => {
  const { camera } = useThree((state) => state);
  const { cameraAttributes } = useAttributes();

  useFrame(() => {
    camera.top = cameraAttributes.top;
    camera.bottom = cameraAttributes.bottom;
    camera.left = cameraAttributes.left;
    camera.right = cameraAttributes.right;
    camera.updateProjectionMatrix();
  });

  return (
    <>
      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={0.75}
          luminanceSmoothing={0}
          luminanceThreshold={0}
        />
      </EffectComposer>
      <Lights />
      <Planets />
    </>
  );
};

export default Experience;
