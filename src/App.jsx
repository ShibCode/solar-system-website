import React from "react";
import Experience from "./components/experience";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Perf } from "r3f-perf";

const App = () => {
  return (
    <>
      <Leva collapsed />

      <Canvas
        className="!fixed inset-0"
        camera={{ visible: false }}
        orthographic
      >
        {/* <Perf position="top-left" /> */}
        <Experience />
      </Canvas>
    </>
  );
};

export default App;
