import React from "react";
import image1 from "../../assets/church/1.webp";
import image2 from "../../assets/church/2.webp";
import image3 from "../../assets/church/3.png";
import { motion } from "framer-motion";

const Meaningful = () => {
  return (
    <div className="bg-white text-black text-center py-16 px-4">
      {/* Title */}
      <motion.h2
        whileHover={{ scale: 1.03 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
      >
        Create Premium <br /> Images with AI Engine
      </motion.h2>

      {/* Description */}
      <p className="max-w-xl mx-auto mb-12 text-base sm:text-lg">
        Join hands to create a better world. Volunteer today and make a meaningful
        impact in your community.
      </p>

      {/* Images Container */}
      <div className="relative flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0">
        
        {/* Left Image */}
        <motion.img
          src={image1}
          alt="Gallery"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.5 }}
          className="w-40 sm:w-48 md:w-64 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 rounded-md shadow-lg"
        />

        {/* Center Image */}
        <motion.img
          src={image2}
          alt="AI Engine"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 1.5 }}
          className="w-full max-w-sm sm:max-w-md md:max-w-xl md:static md:mx-4 rounded-lg shadow-xl"
        />

        {/* Right Image */}
        <motion.img
          src={image3}
          alt="Robot"
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ scale: 1.05 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 2 }}
          className="w-16 sm:w-20 md:w-28 rounded-full md:absolute md:right-0 md:-top-10 border-4 border-white shadow-lg"
        />
      </div>
    </div>
  );
};

export default Meaningful;
