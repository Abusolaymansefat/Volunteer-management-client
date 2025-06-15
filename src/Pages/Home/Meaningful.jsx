import React from "react";
import image1 from "../../assets/church/1.webp";
import image2 from "../../assets/church/2.webp";
import image3 from "../../assets/church/3.png";
import { motion } from "framer-motion";

const Meaningful = () => {
  return (
    <div className="text-center  py-16 px-4">
      <motion.h2 whileHover={{ scale: 1.03 }} className="text-4xl md:text-5xl font-bold text-brown-900 mb-12">
        Create Premium <br /> Images with AI Engine
      </motion.h2>

      <div className="relative flex justify-center items-center">
    
        <motion.img
          src={image1}
          alt="Gallery"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-48 md:w-64 left-20 md:-left-40 top-1/2 "
        />


        <motion.img
          src={image2}
          alt="AI Engine"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 1.5 }}
          className="w-[80%] md:w-[60%] max-w-4xl"
        />

        
        <motion.img
          src={image3}
          alt="Robot"
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ scale: 1.03 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 2 }}
          className="w-20 md:w-28 rounded-full -top-10 md:-top-10 right-4 md:right-20 border-4 border-white shadow-lg "
        />
      </div>
    </div>
  );
};

export default Meaningful;
