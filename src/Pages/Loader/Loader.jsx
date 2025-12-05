import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./Loader.css";

const Loader = () => {
  const uRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray(".st-letter");
      const firstLine = gsap.utils.toArray(".st-line:nth-child(1) .st-letter");
      const secondLine = gsap.utils.toArray(".st-line:nth-child(2) .st-letter");

      // --- INITIAL STATE (Stranger Things style) ---
      gsap.set(uRef.current, { opacity: 1 });
      gsap.set(".st-bg", {
        opacity: 0,
        scale: 1.1,
      });

      gsap.set(".st-name-wrapper", {
        opacity: 0,
        scale: 1.1, // subtle zoom-in start
      });

      gsap.set(letters, {
        opacity: 0,
        letterSpacing: "2.5em", // very wide, like the intro
        filter: "blur(8px)",
        y: 10, // slightly down
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        delay: 0.5,
      });

      // 1. Background fade-in + vignette feel
      tl.to(".st-bg", {
        opacity: 1,
        duration: 2.5,
        ease: "power1.inOut",
      });

      // 2. Fade in the whole title wrapper
      tl.to(
        ".st-name-wrapper",
        {
          opacity: 1,
          duration: 2,
        },
        "-=1.5"
      );

      // 3. FIRST LINE (TUSHAR) – slow, ominous reveal
      tl.to(
        firstLine,
        {
          opacity: 1,
          letterSpacing: "0.35em",
          filter: "blur(0px)",
          y: 0,
          duration: 4,
          stagger: {
            each: 0.12,
            from: "edges",
          },
        },
        "-=1.5"
      );

      // 4. SECOND LINE (VASHISHTHA) – comes in slightly later
      tl.to(
        secondLine,
        {
          opacity: 1,
          letterSpacing: "0.3em",
          filter: "blur(0px)",
          y: 0,
          duration: 4,
          stagger: {
            each: 0.1,
            from: "center",
          },
        },
        "-=3" // overlaps with first line like the real intro
      );

      // 5. Global tracking collapse to final spacing (both lines together)
      tl.to(
        letters,
        {
          letterSpacing: "0.15em",
          duration: 3,
          ease: "power1.inOut",
        },
        "-=2"
      );

      // 6. Continuous slow zoom-in on the whole word (camera push)
      tl.to(
        ".st-name-wrapper",
        {
          scale: 1.18,
          duration: 12,
          ease: "power1.inOut",
        },
        "-=3"
      );

      // 7. Red glow pulse (like the neon title)
      tl.to(
        letters,
        {
          textShadow:
            "0 0 18px rgba(255,0,0,0.9), 0 0 32px rgba(255,0,0,0.7)",
          duration: 3,
          ease: "sine.inOut",
        },
        "-=10"
      );

      // 8. Subtle flicker loop
      tl.to(
        letters,
        {
          keyframes: [
            { opacity: 0.9, duration: 0.15 },
            { opacity: 1, duration: 0.2 },
            { opacity: 0.85, duration: 0.1 },
            { opacity: 1, duration: 0.25 },
          ],
          repeat: -1,
          repeatDelay: 3,
          ease: "steps(1)",
        },
        "-=5"
      );

      // 9. Fade out entire loader at the end
      tl.to(
        uRef.current,
        {
          opacity: 0,
          duration: 1.2,
          onComplete: () => {
            gsap.set(uRef.current, { display: "none" });
          },
        },
        "+=4"
      );
    }, uRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={uRef}
      className="h-[100%] w-[100%] overflow-hidden flex items-center justify-center fixed top-0 left-0 z-50 bg-black"
    >
      <div className="st-bg absolute inset-0 bg-black" />

      <div className="st-name-wrapper relative flex flex-col items-center gap-6">
        {/* FIRST NAME */}
        <div className="flex font-bold leading-none m-0 p-0 st-line">
          {"TUSHAR".split("").map((ch, i) => (
            <span
              key={`first-${i}`}
              className={
                "st-letter font-[STO] font-light text-red-600 " +
                (i === 0 || i === 5
                  ? "text-[11vw] md:text-[9vw]"
                  : "text-[10vw] md:text-[8vw]")
              }
            >
              {ch}
            </span>
          ))}
        </div>

        {/* LAST NAME */}
        <div className="flex font-bold leading-none m-0 p-0 st-line">
          {"VASHISHTHA".split("").map((ch, i) => (
            <span
              key={`last-${i}`}
              className="st-letter font-[STO] font-light text-red-600 text-[6vw] md:text-[5vw]"
            >
              {ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
