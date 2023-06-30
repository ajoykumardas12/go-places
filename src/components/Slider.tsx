// import { useEffect, useState } from "react";
import places from "../data/places";
import { useSpring } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { useHasFocus } from "../hooks/useHasFocus";
import Slide from "./Slide";
import Progressbar from "./Progressbar";

function Slider() {
  const [page, setPage] = useState(0);
  const { width } = useWindowSize();
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();
  const focus = useHasFocus();
  const sliderLength = places.length;
  const slideDuration = 5;

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
      }, slideDuration * 1000);
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
      <div className="absolute bottom-14 left-2 sm:left-8">
        <Progressbar key={page} time={slideDuration} />
      </div>
    </div>
  );
}

export default Slider;
