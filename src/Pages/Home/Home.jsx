import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import VolunteerNeedsNow from './VolunteerNeedsNow';
import Meaningful from './Meaningful';
import CTASection from './CTASection';


const Home = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/volunteer/sorted')
      .then(res => res.json())
      .then(data => setVolunteers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='my-10'>
      <Banner />
      <VolunteerNeedsNow volunteers={volunteers}></VolunteerNeedsNow>
      <CTASection></CTASection>
      <Meaningful></Meaningful>
     
    </div>
  );
};

export default Home;
