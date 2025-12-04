import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Loader = () => {
  const uRef = useRef(null);

  useLayoutEffect(() => {

    const ctx = gsap.context(() => {
      gsap.from(".down-letter", {
        y: -500,         
        opacity: 0,
        scale: 4,     
        duration: 8,
        ease: "power3.out",
      });

      gsap.from(".zoomInText", {         
        opacity: 0,
        scale: 4,     
        duration: 6,
        ease: "power3.out",
      });
      gsap.from(".SDownText", {         
        opacity: 0,
        y:-300,    
        duration: 4,
        delay : 2,
        ease: "power3.out",
      });
      gsap.from(".leftText", {         
        opacity: 0,
        x:-600, 
        scale: 5,   
        duration: 4,
        delay : 1,
        ease: "power3.out",
      });
      gsap.from(".rightText", {         
        opacity: 0,
        x:600, 
        scale: 5,   
        duration: 4,
        delay : 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert(); 
  }, []);

  return (
    <div className="h-[100%] w-[100%] bg-red-900 overflow-hidden flex flex-col items-center justify-center">
      <div className="flex font-bold text-[15rem] font-[ST] leading-none m-0 p-0">
        <div className="leftText">T</div>
        <div className="SDownText">U</div>
        <div className="zoomInText flex">
        <div >S</div>
        <div >H</div>
        </div>
        <div className="SDownText">A</div>
        <div className="rightText">R</div>
      </div>

      <div className="flex font-bold text-[15rem] leading-none m-0 p-0">
        <div>V</div>
        <div>A</div>
        <div>S</div>
        <div>H</div>
        <div>I</div>
        <div>S</div>
        <div>H</div>
        <div>T</div>
        <div>H</div>
        <div>A</div>
      </div>
    </div>
  );
};

export default Loader;
