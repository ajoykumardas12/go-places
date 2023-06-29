import { MotionValue, motion, useTransform } from "framer-motion";
import { PlaceType } from "../types/types";

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
        className="w-full h-full object-cover select-none pointer-events-none"
      />
      <div className="absolute bottom-20 left-2 sm:left-8 text-white/80 font-semibold">
        <div className="text-base sm:text-xl">{place.name}</div>
        <div className="text-lg sm:text-2xl">{place.country}</div>
      </div>
    </motion.div>
  );
}

export default Slide;
