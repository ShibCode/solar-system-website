import React, { useEffect, useMemo, useRef } from "react";
import {
  orbits,
  planets,
  ZOOM_IN_DELAY,
  ZOOM_IN_DURATION,
  ZOOM_OUT_DELAY,
  ZOOM_OUT_DURATION,
} from "./constants";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import Orbit from "./Orbit";
import Planet from "./Planet";
import {
  setHoveredPlanet,
  toggleIsChangingZoom,
  updateFocusedPlanet,
} from "../../features/orbitSlice/orbitSlice";
import { useDispatch, useSelector } from "react-redux";
import useUpdateEffect from "../../hooks/useUpdateEffect";

const ASPECT = 0.25; // Aspect ratio used for orbit calculation

const Planets = () => {
  const { focusedPlanet } = useSelector((state) => state.orbit);
  const dispatch = useDispatch();

  const { camera } = useThree();

  const groupRef = useRef(); // Reference to the group containing all planets and orbits
  const planetMeshes = useRef([]); // Reference array to store the meshes of planets for raycasting

  const hoveredPlanetRef = useRef(null); // To prevent a rerender each frame by using it as a check in useFrame

  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  const groupAttributes = useRef({
    scale: 1,
    positionX: 0,
    positionY: 0,
  }); // update these values using gsap and map these over the whole group

  useEffect(() => {
    const handleClick = () => dispatch(updateFocusedPlanet());

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useUpdateEffect(() => {
    dispatch(toggleIsChangingZoom()); // set the isChangingZoom state to true to disable interactions during the animation

    let targetScale = 1;
    let targetX = 0;
    let targetY = 0;

    if (focusedPlanet) {
      const { x, y } = focusedPlanet.object.position;
      const planetScale = focusedPlanet.object.scale.x;

      // calculating the focus position
      targetScale = 9;
      targetX = -x * targetScale + camera.left - 3.75 * planetScale;
      targetY = -y * targetScale - 0.4;
    }

    gsap.to(groupAttributes.current, {
      scale: targetScale,
      positionX: targetX,
      positionY: targetY,
      duration: focusedPlanet ? ZOOM_IN_DURATION : ZOOM_OUT_DURATION,
      delay: focusedPlanet ? ZOOM_IN_DELAY : ZOOM_OUT_DELAY,
      ease: "power2.inOut",
      onComplete: () => dispatch(toggleIsChangingZoom()), // set the isChangingZoom state to false once the animation is complete
    });
  }, [focusedPlanet]);

  useFrame((state) => {
    // handle the raycasting for detecting the hovered planet
    raycaster.setFromCamera(state.pointer, state.camera);
    const intersects = raycaster.intersectObjects(planetMeshes.current);

    if (intersects[0] && !hoveredPlanetRef.current) {
      dispatch(setHoveredPlanet(intersects[0]));
      hoveredPlanetRef.current = intersects[0];
    } else if (!intersects[0]) {
      dispatch(setHoveredPlanet(null));
      hoveredPlanetRef.current = null;
    }

    // this handles the zooming effect by enlarging the galaxy
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
