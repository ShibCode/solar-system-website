import React from "react";
import gsap from "gsap";
import Accordian from "./Accordian";

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

const Services = ({ useOnActive }) => {
  useOnActive((baseDelay) => {
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
      accordianBackgrounds,
      { opacity: 0, scaleX: 0 },
      {
        opacity: 1,
        scaleX: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
        delay: baseDelay,
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
        delay: baseDelay + 0.5,
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
        delay: baseDelay + 0.5,
      }
    );
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-[700px]">
      {servicesData.map((service, i) => (
        <Accordian key={i} service={service} />
      ))}
    </div>
  );
};

export default Services;
