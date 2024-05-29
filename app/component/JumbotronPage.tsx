import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import tronPage from "../../public/tron-page.jpg";

const JumbotronPage = ({ title }: { title: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start(`visible`);
    }
  }, [isInView]);
  return (
    <div className="overflow-hidden flex justify-center items-center">
      <motion.div
        className={`absolute text-center text-white translate-y-10 lg:md:text-[60px] text-[30px] font-bold uppercase text`}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={`visible`}
        transition={{ duration: 1, delay: 0.25 }}
      >
        {title}
      </motion.div>
      <Image
        src={tronPage}
        alt="Picture of the author"
        className="object-cover w-full lg:md:h-[30vh] h-[30vh]"
      />
    </div>
  );
};

export default JumbotronPage;
