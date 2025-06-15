import React from "react";

const CTASection = () => {
  return (
    <div className="bg-[#524f44] py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <h2 className="text-4xl font-bold">Our Door Are Always Open to More People Who Want to Support Each Others!</h2>
      
        <div
          className="relative rounded-2xl overflow-hidden text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581090700227-1e37b190418e')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 p-8 flex flex-col justify-between h-full">
            <h3 className="text-2xl font-bold mb-4">Become a volunteer</h3>
            <p className="mb-6">
              Provide resources such as reports, infographics, and educational materials related to the charity's cause.
              Use a clear and intuitive navigation menu to help users find information quickly.
            </p>
            <button className="bg-[#6b654d] hover:bg-[#afaca0] text-black font-semibold px-6 py-2 rounded-full w-max transition duration-300">
              Learn More →
            </button>
          </div>
        </div>

       
        <div
          className="relative rounded-2xl overflow-hidden text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1607746882042-944635dfe10e')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 p-8 flex flex-col justify-between h-full">
            <h3 className="text-2xl font-bold mb-4">Join Us volunteer</h3>
            <p className="mb-6">
              Provide resources such as reports, infographics, and educational materials related to the charity's cause.
              Use a clear and intuitive navigation menu to help users find information quickly.
            </p>
            <button className="bg-[#6b654d] hover:bg-[#afaca0] text-black font-semibold px-6 py-2 rounded-full w-max transition duration-300">
              Learn More →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
