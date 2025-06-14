import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import VolunteerNeedsNow from './VolunteerNeedsNow';


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
     
    </div>
  );
};

export default Home;
