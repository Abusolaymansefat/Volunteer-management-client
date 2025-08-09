import React from "react";
import { useNavigate } from "react-router";

const BecomeVolunteerSection = () => {
     const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/join");
  };
  return (
    <section className="max-w-7xl bg-[#e4e0e0] px-5 py-4 flex flex-col items-center">
      <h1
        className="font-extrabold flex items-center gap-2
               text-[10rem] md:text-[15rem] lg:text-[20rem]"
      >
        <span className="text-green-700">B</span>
        <span className="text-green-900">ecome</span>
      </h1>

      <h2 className="text-[6.5rem] font-semibold text-green-800 mb-2">
        <span className="text-green-700">a vo</span>
        <span className="text-green-900">lunteer with VBD</span>
      </h2>

      <p className="text-sm max-w-6xl text-[#fff] dark:text-gray-600 mb-10 leading-relaxed">
        At Volunteer for Bangladesh, our volunteers come from all walks of life,
        bringing unique perspectives and skills to our mission. We believe in
        the power of diversity, and every application is evaluated individually.
        We look at more than just qualifications; we consider the competencies,
        skills, and experiences that make you who you are. If you’re ready to
        make a real impact and contribute your talents to the service of
        Bangladesh, we’d love to have you on board. Join us and be part of
        something bigger together, we can drive lasting change. Let’s Rebuild
        Our Nation.
      </p>

      <button onClick={handleJoinClick} className="bg-[#48bec7] hover:bg-[#528083] text-center transition text-black font-semibold py-3 px-8 rounded-full mt-6">
        Join Us
      </button>
    </section>
  );
};

export default BecomeVolunteerSection;
