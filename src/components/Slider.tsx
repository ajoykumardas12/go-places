// import { useEffect, useState } from "react";
import places from "../data/places";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { PlaceType } from "../types/types";
import { useHasFocus } from "../hooks/useHasFocus";

function Slider() {
  const [page, setPage] = useState(0);

  const sliderLength = places.length;
  // const sliderIndex = page % sliderLength;

  const paginate = (newDirection: number) => {
    setPage(page + newDirection);
    console.log(`paginated to ${page + newDirection}`);
  };

  const { width } = useWindowSize();

  const animatedValue = useSpring(page, { stiffness: 50, damping: 11 });
  useEffect(() => {
    animatedValue.set(page);
  }, [animatedValue, page]);

  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();
  const focus = useHasFocus();

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

function Slide({
  width,
  animatedValue,
  totalSlides,
  place,
  index,
}: {
  width: number;
  animatedValue: MotionValue;
  totalSlides: number;
  place: PlaceType;
  index: number;
}) {
  const xTransition = useTransform(animatedValue, (latest) => {
    const relativePlace = latest % totalSlides;
    const offset = (index - relativePlace) % totalSlides;
    let memo = width * offset;

    if (offset > totalSlides / 2) {
      memo -= totalSlides * width;
    } else if (offset < -totalSlides / 2) {
      memo += totalSlides * width;
    }

    return memo;
  });
  return (
    <motion.div
      style={{ x: xTransition }}
      className="absolute inset-0 flex place-items-center"
      transition={{ duration: 2 }}
    >
      <motion.img
        src={`/images/${place.imageSrc}`}
        alt={place.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-20 left-2 sm:left-8 text-white/80 font-semibold">
        <div className="text-base sm:text-xl">{place.name}</div>
        <div className="text-lg sm:text-2xl">{place.country}</div>
      </div>
    </motion.div>
  );
}

export default Slider;
