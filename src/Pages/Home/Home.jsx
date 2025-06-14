import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import VolunteerNeedsNow from './VolunteerNeedsNow';
import Meaningful from './Meaningful';


const Home = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/volunteer/sorted')
      .then(res => res.json())
      .then(data => setVolunteers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Banner />
      <VolunteerNeedsNow volunteers={volunteers}></VolunteerNeedsNow>
      <Meaningful></Meaningful>
     
    </div>
  );
};

export default Home;
