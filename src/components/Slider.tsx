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
  const [slideLoaded, setSlideLoaded] = useState(false);
  const { width } = useWindowSize();
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();
  const focus = useHasFocus();
  const sliderLength = places.length;
  const slideDuration = 6;

  const animatedValue = useSpring(page, { stiffness: 50, damping: 11 });
  useEffect(() => {
    animatedValue.set(page);
  }, [animatedValue, page]);

  const startAutoplay = () => {
    console.log("trying autoplay");
    if (!autoPlayRef.current) {
      autoPlayRef.current = setInterval(() => {
        if (focus)
          setPage((prev) => {
            return prev + 1;
          });
      }, slideDuration * 1000);
      console.log("started autoplay");
    }
  };

  const clearAutoplay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = undefined;
    console.log(autoPlayRef);
  };

  useEffect(() => {
    setSlideLoaded(true);
    startAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextSlide = () => {
    console.log("next");
    clearAutoplay();
    setPage((prev) => {
      return prev + 1;
    });
    startAutoplay();
  };
  const previousSlide = () => {
    console.log("previous");
    clearAutoplay();
    setPage((prev) => {
      return prev - 1;
    });
    startAutoplay();
  };

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
      {slideLoaded && (
        <div className="absolute bottom-14 left-2 sm:left-8">
          <Progressbar key={page} time={slideDuration} />
        </div>
      )}
      <button
        onClick={nextSlide}
        className="absolute bottom-40 right-2 bg-gray-700"
      >
        next
      </button>
      <button
        onClick={previousSlide}
        className="absolute bottom-40 left-2 bg-gray-700"
      >
        previous
      </button>
    </div>
  );
}

export default Slider;
