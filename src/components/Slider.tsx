// import { useEffect, useState } from "react";
import places from "../data/places";
import { useSpring } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { useHasFocus } from "../hooks/useHasFocus";
import Slide from "./Slide";

function Slider() {
  const [page, setPage] = useState(0);
  const { width } = useWindowSize();
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();
  const focus = useHasFocus();
  const sliderLength = places.length;

  const animatedValue = useSpring(page, { stiffness: 50, damping: 11 });
  useEffect(() => {
    animatedValue.set(page);
  }, [animatedValue, page]);

  useEffect(() => {
    if (!autoPlayRef.current) {
      autoPlayRef.current = setInterval(() => {
        if (focus)
          setPage((prev) => {
            return prev + 1;
          });
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {places.map((place, index) => {
        return (
          <Slide
            key={place.id}
            width={width}
            animatedValue={animatedValue}
            totalSlides={sliderLength}
            place={place}
            index={index}
          />
        );
      })}
    </div>
  );
}

export default Slider;
