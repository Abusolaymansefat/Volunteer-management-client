import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import VolunteerNeedsNow from "./VolunteerNeedsNow";
import Meaningful from "./Meaningful";
import CTASection from "./CTASection";
import BecomeVolunteerSection from "./BecomeVolunteerSection";

const Home = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/volunteer/top")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setVolunteers(data))
      .catch((err) => console.error("Error fetching top volunteers:", err));
  }, []);

  return (
    <div className="">
      <Banner />
      <VolunteerNeedsNow posts={volunteers} />
      <BecomeVolunteerSection/>
      <CTASection />
      <Meaningful />
    </div>
  );
};

export default Home;
