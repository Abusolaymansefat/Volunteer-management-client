import React from 'react';

const Volunteer = ({ volunteers }) => {
  return (
    <div className='my-10 p-5 space-y-4'>
        <h1 className="text-2xl text-center font-bold ">Church and Charity Template Kit</h1>
        <p className='text-sm text-center text-shadow-gray-400'>The puprose of our church community is to worship the Glory of God. We live to be called to speak, think and work by remembering the gospel. </p>
      <h2 className="text-xl font-bold mb-4">Total Posts: {volunteers.length}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {volunteers.map((item) => (
          <div key={item._id} className="p-4 border rounded shadow">
            <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
            <p>{item.category}</p>
            <p>{item.location}</p>
            <p>Volunteers Needed: {item.volunteers}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Volunteer;
