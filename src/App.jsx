import React, { useEffect } from "react";
import Experience from "./components/experience";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Perf } from "r3f-perf";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const App = () => {
  useEffect(() => {});

  return (
    <>
      <Leva collapsed hidden />

      <div className="fixed inset-0 bg-[url('/background2.png')] bg-no-repeat bg-cover bg-center" />

      <Canvas
        className="!fixed inset-0"
        camera={{ visible: false }}
        orthographic
      >
        <Perf position="top-left" />
        <Experience />
      </Canvas>

      <Header />
      <Footer />
    </>
  );
};

export default App;
