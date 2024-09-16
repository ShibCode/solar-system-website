import React, { useEffect, useRef, useState } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import gsap from "gsap";
import {
  ZOOM_IN_DELAY,
  ZOOM_IN_DURATION,
} from "../../components/experience/constants";
import Accordian from "./Accordian";
import { useSelector } from "react-redux";
import Navigation from "../../layout/Navigation";

const servicesData = [
  {
    title: "Web Development",
    description:
      "I specialize in creating responsive, performance-optimized websites using the latest web technologies. From front-end development with React to back-end solutions with Node.js, I ensure your website is robust, user-friendly, and scalable.",
    color: "#d32c2c",
  },
  {
    title: "UI/UX Design",
    description:
      "My design approach focuses on creating intuitive, aesthetically pleasing interfaces that enhance user experience. By combining creativity with usability, I ensure that each design not only looks great but also provides a seamless interaction flow.",
    color: "#ff728b",
  },
  {
    title: "E-commerce Solutions",
    description:
      "I build e-commerce platforms that are designed to convert. From shopping carts to payment gateways, I create secure and scalable solutions tailored to your business needs.",
    color: "#902b90",
  },
  {
    title: "Content Management Systems (CMS)",
    description:
      "I develop custom CMS solutions, or work with platforms like WordPress, to give you complete control over your content. Easily update your site without needing any coding knowledge.",
    color: "#207435",
  },
  {
    title: "SEO Optimization",
    description:
      "I help optimize your website for search engines to improve your visibility online. From keyword research to on-page optimization, I use best practices to boost your rankings.",
    color: "#154545",
  },
];

const navigationLinks = [
  {
    label: "Services",
    onClick: () => {},
  },
  {
    label: "Projects",
    onClick: () => {},
  },
  {
    label: "About Us",
    onClick: () => {},
  },
  {
    label: "News",
    onClick: () => {},
  },
  {
    label: "Blogs",
    onClick: () => {},
  },
];

const Services = () => {
  const { focusedPlanet } = useSelector((state) => state.orbit);

  const wrapper = useRef();
  const headingWrapper = useRef();

  useEffect(() => {
    if (focusedPlanet) {
      const delay = ZOOM_IN_DELAY + ZOOM_IN_DURATION - 0.5;

      const accordianBackgrounds = document.querySelectorAll(
        ".service-accordian-background"
      );
      const accordianTitles = document.querySelectorAll(
        ".service-accordian-title"
      );
      const accordianButtons = document.querySelectorAll(
        ".service-accordian-btn"
      );

      gsap.fromTo(
        headingWrapper.current,
        { opacity: 0, y: -120 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay }
      );

      gsap.fromTo(
        accordianBackgrounds,
        { opacity: 0, scaleX: 0 },
        {
          opacity: 1,
          scaleX: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power2.out",
          delay,
        }
      );
      gsap.fromTo(
        accordianTitles,
        { opacity: 0, x: (i) => 60 + 10 * i },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
          delay: delay + 0.5,
        }
      );
      gsap.fromTo(
        accordianButtons,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
          delay: delay + 0.5,
        }
      );
    }

    return () => {
      if (wrapper.current) {
        gsap.to(wrapper.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };
  }, [focusedPlanet]);

  return (
    <div
      ref={wrapper}
      className="pt-[200px] pb-[120px] gap-16 w-fit mx-auto hide-scroll flex-1 overflow-auto"
    >
      <Navigation label="Services" navigationLinks={navigationLinks} />

      <div className="flex flex-col items-center gap-16 w-full">
        <div ref={headingWrapper} className="relative px-8 pt-6">
          <div className="size-4 border-r-2 border-b-2 border-white absolute top-0 left-0" />
          <div className="size-4 border-l-2 border-b-2 border-white absolute top-0 right-0" />

          <span className="leading-none absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap text-white">
            What I offer
          </span>

          <h1 className="text-4xl font-semibold">Services</h1>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-[700px]">
          {servicesData.map((service, i) => (
            <Accordian key={i} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
