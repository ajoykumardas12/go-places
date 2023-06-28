import { useEffect, useState } from "react";
import places from "../data/places";
import { AnimatePresence, motion } from "framer-motion";

function Slider() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const sliderLength = places.length;
  const sliderIndex = page % sliderLength;

  const paginate = (newDirection: number) => {
    setPage(page + newDirection);
    setDirection(newDirection);
    console.log(`paginated to ${page + newDirection}`);
  };

  const width = document.body.offsetWidth;

  //   useEffect(() => {
  //     setInterval(() => {
  //       paginate(1);
  //     }, 5000);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={`/images/${places[sliderIndex].imageSrc}`}
          custom={direction}
          initial={{ x: width }}
          animate={{ x: 0 }}
          exit={{ x: -width }}
          transition={{
            x: { type: "spring", stiffness: "300", damping: "300" },
          }}
          className="w-full h-screen object-cover"
        />
      </AnimatePresence>
      <button onClick={() => paginate(1)} className="absolute bottom-2 right-2">
        next
      </button>
    </div>
  );
}

export default Slider;
