import React, { useEffect, useRef, useState } from "react";
import "./Icecream.css";
import img from "./screen_1440x0_309.webp";
const Icecream = () => {
  const ref = useRef();
  const myRef = useRef();
  // const [bgContainerSize, setBgContainerSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  useEffect(() => {
    const scrollY = window.scrollY;

    const resizeHandler = () => {
      // setBgContainerSize({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // });
      ref.current.style.clipPath = `polygon(0px 0px, ${screenWidth}px 0px, ${screenWidth}px ${screenHeight}px, 0px ${screenHeight}px)`;
    };

    const scrollHandler = () => {
      ref.current.style.clipPath = `polygon(${scrollY}px ${scrollY / 40}px, ${
        screenWidth - scrollY
      }px ${scrollY / 40}px, ${screenWidth - scrollY}px ${
        screenHeight - scrollY / 40
      }px, ${scrollY}px ${screenHeight - scrollY / 40}px)`;
      ref.current;
      // Calculate the new scale value
      const newScale = 1 - 0.1 * (scrollY / 100); // Adjust 100 as needed

      if (newScale > 0.7) {
        myRef.current.style.transform = `scale(${newScale})`;
      }
    };

    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", resizeHandler);

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener("scroll", scrollHandler);
      // window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      <div className="bgContainer" ref={ref}>
        <div className="bgImg" ref={myRef}>
          <img src={img} />
        </div>
      </div>
      <div className="hero"></div>
    </>
  );
};

export default Icecream;
