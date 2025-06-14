import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import Volunteer from './Volunteer';

const Home = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
      .then(res => res.json())
      .then(data => setVolunteers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Banner />
      <Volunteer volunteers={volunteers} />
    </div>
  );
};

export default Home;
