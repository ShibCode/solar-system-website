import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Html } from "@react-three/drei";
import { orbits, planets } from "./constants";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import Orbit from "./Orbit";
import Planet from "./Planet";
import {
  setFocusedPlanet,
  setHoveredPlanet,
  toggleIsChangingZoom,
} from "../../features/orbitSlice/orbitSlice";
import { useDispatch, useSelector } from "react-redux";

// Aspect ratio used for orbit calculation
const ASPECT = 0.25;

const Planets = () => {
  const { hoveredPlanet, focusedPlanet, isChangingZoom } = useSelector(
    (state) => state.orbit
  );
  const dispatch = useDispatch();

  const { camera } = useThree();

  const groupRef = useRef(); // Reference to the group containing all planets and orbits
  const planetMeshes = useRef([]); // Reference array to store the meshes of planets for raycasting

  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  const groupAttributes = useRef({
    scale: 1,
    positionX: 0,
    positionY: 0,
  }); // main purpose here was to add smooth ease rather than linear ease

  useEffect(() => {
    const handleClick = () => {
      dispatch(toggleIsChangingZoom());

      const focusScale = 9; // the scale when we are focused on one planet

      const { x, y } = hoveredPlanet.object.position;
      const planetScale = hoveredPlanet.object.scale.x;

      const targetScale = focusedPlanet ? 1 : focusScale;
      const targetX = focusedPlanet
        ? 0
        : -x * targetScale + camera.left - 3.75 * planetScale;
      const targetY = focusedPlanet ? 0 : -y * targetScale;
      y;

      gsap.to(groupAttributes.current, {
        scale: targetScale,
        positionX: targetX,
        positionY: targetY,
        duration: focusedPlanet ? 1 : 1.5,
        ease: "power2.inOut",
        onComplete: () => dispatch(toggleIsChangingZoom()),
      });

      if (focusedPlanet) dispatch(setFocusedPlanet(null));
      else dispatch(setFocusedPlanet(hoveredPlanet));
    };

    if (!isChangingZoom && hoveredPlanet)
      window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [hoveredPlanet, isChangingZoom]);

  useFrame((state) => {
    // handle the raycasting for detecting the hovered planet
    raycaster.setFromCamera(state.pointer, state.camera);
    const intersects = raycaster.intersectObjects(planetMeshes.current);

    if (intersects[0]) dispatch(setHoveredPlanet(intersects[0]));
    else dispatch(setHoveredPlanet(null));

    groupRef.current.scale.setScalar(groupAttributes.current.scale);
    groupRef.current.position.x = groupAttributes.current.positionX;
    groupRef.current.position.y = groupAttributes.current.positionY;
  });

  const getPath = (curve) => {
    const points = curve.getPoints(100);
    return new THREE.BufferGeometry().setFromPoints(points);
  };

  const curves = useMemo(() => {
    return orbits.map(
      (orbit) =>
        new THREE.EllipseCurve(
          0,
          0,
          1.25,
          1.25 * ASPECT,
          0,
          Math.PI * 2,
          false,
          orbit.rotation
        )
    );
  }, []);
  const paths = useMemo(() => curves.map(getPath), []);

  return (
    <group ref={groupRef}>
      {orbits.map((orbit, i) => (
        <Orbit scale={orbit.scale} path={paths[i]} key={i} index={i} />
      ))}

      {planets.map((planet, i) => (
        <Planet
          key={i}
          planet={planet}
          orbit={orbits[i]}
          points={curves[i]}
          ref={(ref) => (planetMeshes.current[i] = ref)}
          mesh={planetMeshes.current[i]}
          index={i}
        />
      ))}
    </group>
  );
};

export default Planets;
