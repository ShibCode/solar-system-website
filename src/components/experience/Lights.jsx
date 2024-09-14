import { useControls } from "leva";
import React from "react";

const Lights = () => {
  const lightControls = useControls("light", {
    ambientIntensity: { value: 0.4, min: 0, max: 5, step: 0.01 },
    directionalIntensity: { value: 3.8, min: 0, max: 5, step: 0.01 },
    directionalX: { value: 9, step: 0.1 },
    directionalY: { value: 7, step: 0.1 },
    directionalZ: { value: 9, step: 0.1 },
  });

  return (
    <>
      <ambientLight intensity={lightControls.ambientIntensity} />
      <directionalLight
        intensity={lightControls.directionalIntensity}
        position={[
          lightControls.directionalX,
          lightControls.directionalY,
          lightControls.directionalZ,
        ]}
      />
    </>
  );
};

export default Lights;
