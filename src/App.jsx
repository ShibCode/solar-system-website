import React, { useEffect } from "react";
import Experience from "./components/experience";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Perf } from "r3f-perf";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import gsap from "gsap";
import {
  ORBIT_SCALE_UP_COMPLETE_DURATION,
  pages,
  PLANET_FADE_IN_DURATION,
} from "./constants";
import Navigation from "./layout/Navigation";
import PageWrapper from "./PageWrapper";
import { Flip } from "gsap/all";

const App = () => {
  gsap.registerPlugin(Flip);

  useEffect(() => {
    const items = document.querySelectorAll(".item-slide");

    gsap.fromTo(
      items,
      {
        y: (_, elem) => {
          const shouldSlideUp = elem.classList.contains("slide-up");

          return 120 * (shouldSlideUp ? 1 : -1);
        },
      },
      {
        y: 0,
        stagger: 0.125,
        ease: "power2.out",
        delay: ORBIT_SCALE_UP_COMPLETE_DURATION + PLANET_FADE_IN_DURATION * 0.5,
      }
    );
  }, []);

  return (
    <>
      <Leva collapsed hidden />

      <div className="fixed inset-0 bg-[url('/background.png')] bg-no-repeat bg-cover bg-center -z-20" />

      <Canvas
        className="!fixed inset-0 -z-10"
        camera={{ visible: false }}
        orthographic
      >
        {/* <Perf position="top-left" /> */}
        <Experience />
      </Canvas>

      <Header />

      {pages.map((page, i) => (
        <PageWrapper key={i} page={page}>
          <page.component />
        </PageWrapper>
      ))}

      <Footer />
      <Navigation />
    </>
  );
};

export default App;
