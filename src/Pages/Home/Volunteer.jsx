import React from 'react';

const Volunteer = ({ volunteers }) => {
  return (
    <div>
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
