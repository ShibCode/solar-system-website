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

const ASPECT = 0.3;

const Planets = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [focusedPlanet, setFocusedPlanet] = useState(null);
  const [isChangingZoom, setIsChangingZoom] = useState(false);

  const { camera } = useThree();

  const groupRef = useRef();
  const planetMeshes = useRef([]);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useEffect(() => {
    const handleClick = () => {
      setIsChangingZoom(true);

      const focusScale = 8;
      const targetScale = focusedPlanet ? 1 : focusScale;

      const { x: planetX, y: planetY } = hoveredPlanet.object.position;
      const { x: groupX, y: groupY } = groupRef.current.position;
      const groupScale = groupRef.current.scale.x;

      const distanceScale = targetScale - groupScale;
      const distanceX = focusedPlanet
        ? planetX * focusScale - camera.left
        : -planetX * targetScale + camera.left - groupX;
      const distanceY = focusedPlanet
        ? planetY * focusScale
        : -planetY * targetScale - groupY;

      gsap.to(
        {},
        {
          duration: 1,
          ease: "power2.inOut",
          onUpdate: function () {
            const x = groupX + distanceX * this.progress();
            const y = groupY + distanceY * this.progress();
            const scale = groupScale + distanceScale * this.progress();

            groupRef.current.scale.setScalar(scale);

            groupRef.current.position.set(x, y, 0);
          },
          onComplete: () => setIsChangingZoom(false),
        }
      );

      if (focusedPlanet) setFocusedPlanet(null);
      else setFocusedPlanet(hoveredPlanet);
    };

    if (!isChangingZoom && hoveredPlanet)
      window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [hoveredPlanet, isChangingZoom]);

  useFrame((state) => {
    raycaster.setFromCamera(state.pointer, state.camera);
    const intersects = raycaster.intersectObjects(planetMeshes.current);

    if (intersects[0]) setHoveredPlanet(intersects[0]);
    else setHoveredPlanet(null);
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
