// src/Pages/Loader/STintro/STintro.jsx
import React, { useEffect, useRef } from "react";
import "./STintro.scss";

const STintro = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    // ====== AUDIO SETUP ======
    const music = new Audio(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/music.mp3"
    );
    music.loop = true;

    const tryPlay = () => {
      music
        .play()
        .catch(() => {
          // Autoplay blocked: wait for user interaction
          const resumeOnInteraction = () => {
            music.play().catch(() => {});
            window.removeEventListener("click", resumeOnInteraction);
            window.removeEventListener("keydown", resumeOnInteraction);
          };

          window.addEventListener("click", resumeOnInteraction);
          window.addEventListener("keydown", resumeOnInteraction);
        });
    };

    music.addEventListener("canplay", tryPlay);
    tryPlay();

    // ====== SCROLL LOCK SETUP ======
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock scroll

    const titleEl = titleRef.current;

    const handleAnimationEnd = () => {
      // unlock scroll when title animation completes
      document.body.style.overflow = previousOverflow || "";
      if (titleEl) {
        titleEl.removeEventListener("animationend", handleAnimationEnd);
      }
    };

    if (titleEl) {
      titleEl.addEventListener("animationend", handleAnimationEnd);
    }

    // Cleanup on unmount
    return () => {
      music.pause();
      music.currentTime = 0;
      music.removeEventListener("canplay", tryPlay);

      document.body.style.overflow = previousOverflow || "";
      if (titleEl) {
        titleEl.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, []);

  return (
    <>
      {/* MAIN VIEWPORT – only your name, animation starts immediately */}
      <div className="h-[100%] w-[100%] overflow-hidden viewport--show">
        <div className="scene">
          <div
            className="title title--full title--show"
            ref={titleRef} // 👈 listen for animation end here
          >
            <div className="title-word">
              {/* Top word: TUSHAR */}
              <span className="title-word-letter" data-letter="S1">
                <span className="title-word-letter-large">T</span>
                <div className="titlebar titlebar--left"></div>
              </span>
              <span className="title-word-letter" data-letter="T1">
                U
              </span>
              <span className="title-word-letter" data-letter="R1">
                S
              </span>
              <span className="title-word-letter" data-letter="A">
                H
              </span>
              <span className="title-word-letter" data-letter="N1">
                A
              </span>
              <span className="title-word-letter" data-letter="R2">
                <span className="title-word-letter-large">R</span>
                <div className="titlebar titlebar--right"></div>
              </span>
              <div className="titlebar titlebar--top"></div>
            </div>

            <div></div>

            {/* Second word: VASHISHTHA */}
            <div className="title-word title-word--second">
              <span className="title-word-letter" data-letter="T2">
                V
              </span>
              <span className="title-word-letter" data-letter="H">
                A
              </span>
              <span className="title-word-letter" data-letter="I">
                S
              </span>
              <span className="title-word-letter" data-letter="N2">
                H
              </span>
              <span className="title-word-letter" data-letter="G2">
                I
              </span>
              <span className="title-word-letter" data-letter="S2">
                S
              </span>
              <span className="title-word-letter" data-letter="S2">
                H
              </span>
              <span className="title-word-letter" data-letter="S2">
                T
              </span>
              <span className="title-word-letter" data-letter="S2">
                H
              </span>
              <span className="title-word-letter" data-letter="S2">
                A
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background layers */}
      <div className="vignette"></div>
      <div className="grain"></div>
      <div className="letterbox">
        <div className="letterbox-cover letterbox-cover--top"></div>
        <div className="letterbox-cover letterbox-cover--left"></div>
        <div className="letterbox-cover letterbox-cover--right"></div>
        <div className="letterbox-cover letterbox-cover--bottom"></div>
      </div>
    </>
  );
};

export default STintro;
