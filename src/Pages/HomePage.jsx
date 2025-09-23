import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasScroll from "./CanvasScroll";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const containerRef = useRef();
  const horizontalRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let sections = gsap.utils.toArray(".panel");
      let totalWidth = (sections.length - 1) * window.innerWidth;
      gsap.to(horizontalRef.current, {
        x: -totalWidth, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + totalWidth,
          markers: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="homePage" className="h-screen w-fit flex overflow-hidden">
      <div ref={horizontalRef} className="flex h-full">
        <div className="panel h-full w-[120vw] flex bg-[#050505]">
            <div className="h-full w-[55%] uppercase flex flex-col justify-center">
                <h1 className="text-[11rem] leading-none font-bold text-[#EF5143] font-[font1]">Developer</h1>
                <h1 className="text-[11rem] leading-none font-bold text-[#EF5143] font-[font1]">Creator</h1>
                <h1 className="text-[11rem] leading-none font-bold text-[#EF5143] font-[font1] text-center">Learner</h1>
                <h1 className="text-[11rem] leading-none font-bold text-[#EF5143] font-[font1]">Innovator</h1>
            </div>
            <div className="h-full w-[45%]  bg-[#050505] ">
                <CanvasScroll  speed={0.38} scale={1.3} translateY={100} />
            </div>
        </div>
        <div className="panel h-full w-[100vw] bg-[#EF5143]">
            
        </div>
        <div className="panel h-full w-[100vw] bg-[#2A9D8F]"></div>
        <div className="panel h-full w-[100vw] bg-[#E9C46A]"></div>
      </div>
    </div>
  );
};

export default HomePage;
