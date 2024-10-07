import React, { useEffect, useMemo, useRef } from "react";
import {
  orbits,
  pages,
  ZOOM_IN_DELAY,
  ZOOM_IN_DURATION,
  ZOOM_OUT_DELAY,
  ZOOM_OUT_DURATION,
} from "../../constants";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Orbit from "./Orbit";
import Planet from "./Planet";
import {
  setPlanets,
  toggleIsChangingZoom,
  updateFocusedPlanet,
} from "../../features/orbitSlice/orbitSlice";
import { useDispatch, useSelector } from "react-redux";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { useAttributes } from "../../context/AttributesProvider";

const ASPECT = 0.25; // Aspect ratio used for orbit calculation

const Planets = () => {
  const { focusedPlanet } = useSelector((state) => state.orbit);
  const dispatch = useDispatch();

  const { camera } = useThree();

  const { attributes, setAttributes } = useAttributes();

  const groupRef = useRef(); // Reference to the group containing all planets and orbits
  const planetMeshes = useRef([]); // Reference array to store the meshes of planets for raycasting

  useEffect(() => {
    dispatch(setPlanets(planetMeshes.current));

    const handleClick = () => dispatch(updateFocusedPlanet());

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useUpdateEffect(() => {
    dispatch(toggleIsChangingZoom()); // set the isChangingZoom state to true to disable interactions during the animation

    let targetZoom = 1;
    let targetX = 0;
    let targetY = 0;

    if (focusedPlanet) {
      const { x, y } = focusedPlanet.position;
      const { side, offset, size, zoomIndex } = focusedPlanet.userData.planet;

      // calculating the focus position
      targetZoom = 9 * (zoomIndex ?? 1);
      targetX = x * targetZoom - (camera[side] ?? 0) + offset * size;
      targetY = y * targetZoom + 0.4;
    }

    setAttributes({
      targetZoom,
      targetX,
      targetY,
      duration: focusedPlanet ? ZOOM_IN_DURATION : ZOOM_OUT_DURATION,
      delay: focusedPlanet ? ZOOM_IN_DELAY : ZOOM_OUT_DELAY,
      onComplete: () => dispatch(toggleIsChangingZoom()),
    });
  }, [focusedPlanet]);

  useFrame(() => {
    // this handles the zooming effect by enlarging the galaxy
    groupRef.current.scale.setScalar(attributes.zoom);
    camera.position.x = attributes.x;
    camera.position.y = attributes.y;
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

      {[...pages].reverse().map((page, i) => (
        <Planet
          key={i}
          page={page}
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
