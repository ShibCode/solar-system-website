import React, { createContext, useContext, useEffect, useRef } from "react";
import gsap from "gsap";

const CAMERA_SIZE = 4;

const AttributesContext = createContext();

export const useAttributes = () => {
  const context = useContext(AttributesContext);
  if (context === undefined) {
    throw new Error("useAttributes must be used within a AttributesProvider");
  }
  return context;
};

const AttributesProvider = ({ children }) => {
  const attributes = useRef({
    zoom: 1,
    x: 0,
    y: 0,
  });
  const attributesTween = useRef(null);

  const cameraAttributes = useRef({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  const handleResize = () => {
    const aspect = window.innerWidth / window.innerHeight;

    cameraAttributes.current.top = CAMERA_SIZE;
    cameraAttributes.current.right = CAMERA_SIZE * aspect;
    cameraAttributes.current.bottom = -CAMERA_SIZE;
    cameraAttributes.current.left = -CAMERA_SIZE * aspect;
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setAttributes = ({ targetZoom, targetX, targetY, ...config }) => {
    attributesTween.current = gsap.to(attributes.current, {
      zoom: targetZoom ?? attributes.current.zoom,
      x: targetX ?? attributes.current.x,
      y: targetY ?? attributes.current.y,
      ease: "power2.inOut",
      ...config,
    });
  };

  return (
    <AttributesContext.Provider
      value={{
        attributes: attributes.current,
        setAttributes,
        attributesTween: attributesTween.current,
        cameraAttributes: cameraAttributes.current,
      }}
    >
      {children}
    </AttributesContext.Provider>
  );
};

export default AttributesProvider;
