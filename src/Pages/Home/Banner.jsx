import React from "react";
import { motion } from "motion/react";
import volonder1 from '../../assets/image/Volunteer management 1.jpg';
import volonder2 from '../../assets/image/Volunteer management-2.jpg';

const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-96">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <motion.img
            src={volonder1}
            animate={{y: [50,100, 50]}}
            transition={{duration:6, repeat: Infinity}}
            className="max-w-sm border-emerald-300 border-s-6 border-b-6 rounded-t-[50px] rounded-br-[50px] shadow-2xl"
          />
          <motion.img
            src={volonder2}
            animate={{x: [100,200, 100]}}
            transition={{duration: 8, delay: 5, repeat: Infinity}}
            className="max-w-sm border-emerald-300 border-s-6 border-b-6 rounded-t-[50px] rounded-br-[50px] shadow-2xl"
          />
        </div>
        <div className="flex-1">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 2 } }}
            className="text-5xl font-bold"
          >
            Philanthrop <br />
            <motion.span
              animate={{
                color: ["#fa370d", "#442783", "#8d8095", "#133938"],
                transition: { duration: 4, repeat: Infinity },
              }}
            >
              Charity
            </motion.span>{" "}
            WordPress Theme
          </motion.h1>
          <p className="py-6">
            We create awesome charity theme for volunteers and charity
            organization whole the World.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
