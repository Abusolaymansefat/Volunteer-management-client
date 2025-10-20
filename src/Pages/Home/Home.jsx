import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import VolunteerNeedsNow from "./VolunteerNeedsNow";
import Meaningful from "./Meaningful";
import CTASection from "./CTASection";
import BecomeVolunteerSection from "./BecomeVolunteerSection";
import axiosInstance from "../../api/axiosInstance";
import useLoadingSpinner from "../../hooks/useLoadingSpinner";
import { ScaleLoader } from "react-spinners";

const Home = () => {
  const [volunteers, setVolunteers] = useState([]);
  const { loading, show, hide } = useLoadingSpinner();

  useEffect(() => {
    const fetchTopVolunteers = async () => {
      show();
      try {
        const res = await axiosInstance.get("/volunteer/top");
        setVolunteers(res.data || []);
      } catch (err) {
        console.error("Error fetching top volunteers:", err);
      } finally {
        hide();
      }
    };

    fetchTopVolunteers();
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center mt-10">
          <ScaleLoader color="#5896e6" />
        </div>
      ) : (
        <>
          <Banner />
          <VolunteerNeedsNow posts={volunteers} />
          <BecomeVolunteerSection />
          <CTASection />
          <Meaningful />
        </>
      )}
    </div>
  );
};

export default Home;
