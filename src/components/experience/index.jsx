import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import Lights from "./Lights";
import Planets from "./Planets";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const CAMERA_SIZE = 4;

const Experience = () => {
  const { camera } = useThree((state) => state);

  useEffect(() => {
    const aspect = window.innerWidth / window.innerHeight;

    camera.top = CAMERA_SIZE;
    camera.right = CAMERA_SIZE * aspect;
    camera.bottom = -CAMERA_SIZE;
    camera.left = -CAMERA_SIZE * aspect;
    camera.updateProjectionMatrix();
  }, []);

  useFrame(() => {
    const aspect = window.innerWidth / window.innerHeight;

    camera.top = CAMERA_SIZE;
    camera.right = CAMERA_SIZE * aspect;
    camera.bottom = -CAMERA_SIZE;
    camera.left = -CAMERA_SIZE * aspect;
    camera.updateProjectionMatrix();
  });

  return (
    <>
      {/* <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={0.75}
          luminanceSmoothing={0}
          luminanceThreshold={0}
        />
      </EffectComposer> */}
      <Lights />
      <Planets />
    </>
  );
};

export default Experience;
