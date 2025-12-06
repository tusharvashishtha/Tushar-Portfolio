import React, { useEffect, useRef, useState } from "react";
import "./STintro.scss";

const STintro = () => {
  const titleRef = useRef(null);
  const [moveUp, setMoveUp] = useState(false);
  const blackDivRef = useRef(null);

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
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    let scrollTop =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollTop}px`;
    document.body.style.width = "100%";

    const titleEl = titleRef.current;

    const handleAnimationEnd = () => {
      document.body.style.overflow = previousOverflow || "";
      document.body.style.position = previousPosition || "";
      document.body.style.top = previousTop || "";
      document.body.style.width = previousWidth || "";
      window.scrollTo(0, scrollTop);
      if (titleEl) {
        titleEl.removeEventListener("animationend", handleAnimationEnd);
      }

      // Move the black div upwards after animation completes
      setMoveUp(true);
    };

    if (titleEl) {
      titleEl.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      music.pause();
      music.currentTime = 0;
      music.removeEventListener("canplay", tryPlay);

      document.body.style.overflow = previousOverflow || "";
      document.body.style.position = previousPosition || "";
      document.body.style.top = previousTop || "";
      document.body.style.width = previousWidth || "";
      window.scrollTo(0, scrollTop);

      if (titleEl) {
        titleEl.removeEventListener("animationend", handleAnimationEnd);
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className={`h-[100%] w-[100%] bg-black overflow-auto viewport--show ${
          moveUp ? "move-up" : ""
        }`}
        ref={blackDivRef}
      >
        <div className="scene">
          <div className="title title--full title--show" ref={titleRef}>
            <div className="title-word">
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
              <span className="title-word-letter" data-letter="G2">
                S
              </span>
              <span className="title-word-letter" data-letter="N2">
                H
              </span>
              <span className="title-word-letter" data-letter="S2">
                T
              </span>
              <span className="title-word-letter" data-letter="R2">
                H
              </span>
              <span className="title-word-letter" data-letter="R2">
                A
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="vignette"></div>
      <div className="grain"></div>
      <div className="letterbox">
        <div className="letterbox-cover letterbox-cover--top"></div>
        <div className="letterbox-cover letterbox-cover--left"></div>
        <div className="letterbox-cover letterbox-cover--right"></div>
        <div className="letterbox-cover letterbox-cover--bottom"></div>
      </div>
      <style>
        {`
          .move-up {
            transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateY(-100vh);
          }
        `}
      </style>
    </>
  );
};

export default STintro;
