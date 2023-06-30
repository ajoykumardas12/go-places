import { motion } from "framer-motion";

function Progressbar({ time }: { time: number }) {
  return (
    <div className="w-[112px] h-[0.1rem] bg-slate-500 rounded relative">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `100%` }}
        transition={{ duration: time }}
        className="h-full bg-slate-300 "
      ></motion.div>
      <motion.div
        className="w-4 h-[16px] absolute -bottom-[7px] -left-3 bg-violet-800"
        style={{
          clipPath:
            "polygon(0% 47%, 10% 42%, 0% 20%, 27% 40%, 48% 36%, 35% 0, 40% 0, 77% 36%, 100% 48%, 100% 52%, 77% 64%, 35% 100%, 52% 64%, 27% 60%, 0 80%, 10% 58%, 0% 53%)",
        }}
        initial={{ x: 0 }}
        animate={{ x: 112 }}
        transition={{ duration: time }}
      ></motion.div>
    </div>
  );
}

export default Progressbar;
