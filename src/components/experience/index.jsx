import React, { useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import Lights from "./Lights";
import Planets from "./Planets";
import { useControls } from "leva";

const CAMERA_SIZE = 4;

const Experience = () => {
  const { scene, camera } = useThree((state) => state);

  useEffect(() => {
    const aspect = window.innerWidth / window.innerHeight;

    camera.top = CAMERA_SIZE;
    camera.right = CAMERA_SIZE * aspect;
    camera.bottom = -CAMERA_SIZE;
    camera.left = -CAMERA_SIZE * aspect;
    camera.updateProjectionMatrix();

    scene.background = new THREE.Color("black");
  }, []);

  useFrame((state) => {
    const aspect = window.innerWidth / window.innerHeight;

    camera.top = CAMERA_SIZE;
    camera.right = CAMERA_SIZE * aspect;
    camera.bottom = -CAMERA_SIZE;
    camera.left = -CAMERA_SIZE * aspect;
    camera.updateProjectionMatrix();
  });

  return (
    <>
      <Lights />
      <Planets />
    </>
  );
};

export default Experience;
