import React from "react";
import { motion } from "motion/react";
import volonder1 from '../../assets/image/Volunteer management 1.jpg';
import volonder2 from '../../assets/image/Volunteer management-2.jpg';

const Banner = () => {
  return (
    <div className="hero bg-gray-100 dark:bg-gray-900 min-h-[24rem] px-4 sm:px-6 md:px-12 lg:px-20 transition-colors duration-500">
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start gap-8 lg:gap-16 max-w-7xl mx-auto">
        
        {/* Images Section */}
        <div className="flex-1 flex flex-col space-y-8">
          <motion.img
            src={volonder1}
            animate={{ y: [50, 100, 50] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-full max-w-sm border-emerald-400 border-l-8 border-b-8 rounded-t-[50px] rounded-br-[50px] shadow-2xl object-cover"
            alt="Volunteer 1"
          />
          <motion.img
            src={volonder2}
            animate={{ x: [100, 200, 100] }}
            transition={{ duration: 8, delay: 5, repeat: Infinity }}
            className="w-full max-w-sm border-emerald-400 border-l-8 border-b-8 rounded-t-[50px] rounded-br-[50px] shadow-2xl object-cover"
            alt="Volunteer 2"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left px-2 sm:px-0">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 2 } }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100"
          >
            Philanthrop <br />
            <motion.span
              animate={{
                color: ["#fa370d", "#442783", "#8d8095", "#133938"],
                transition: { duration: 4, repeat: Infinity },
              }}
              className="underline decoration-4 decoration-emerald-500"
            >
              Charity
            </motion.span>{" "}
            WordPress Theme
          </motion.h1>
          <p className="py-6 max-w-md mx-auto lg:mx-0 text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
            We create awesome charity theme for volunteers and charity
            organization whole the World.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
