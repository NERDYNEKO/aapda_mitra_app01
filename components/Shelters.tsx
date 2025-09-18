import React from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { MapPinIcon } from './icons/MapPinIcon';

const sheltersData = [
  { id: 1, name: 'Govt. High School Relief Camp', location: 'Bhubaneswar', distance: '2.5 km', capacity: 250, available: 80 },
  { id: 2, name: 'Community Hall, Sector 12', location: 'Guwahati', distance: '4.1 km', capacity: 150, available: 25 },
  { id: 3, name: 'Red Cross Shelter', location: 'Dehradun', distance: '5.8 km', capacity: 100, available: 90 },
  { id: 4, name: 'City Stadium', location: 'Jaipur', distance: '10.2 km', capacity: 1000, available: 450 },
];

const Shelters: React.FC = () => {
  return (
    <div className="bg-brand-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-brand-gray-700">
      <h2 className="text-3xl font-bold text-brand-gray-100 mb-6 flex items-center gap-3">
        <HomeIcon />
        Nearby Shelters
      </h2>
      <div className="space-y-4">
        {sheltersData.map(shelter => (
          <div key={shelter.id} className="p-4 border border-brand-gray-700 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-gray-900/50">
            <div>
              <h3 className="font-bold text-lg text-brand-blue">{shelter.name}</h3>
              <p className="text-sm text-brand-gray-400 flex items-center gap-1"><MapPinIcon /> {shelter.location} - <span className="font-medium">{shelter.distance} away</span></p>
            </div>
            <div className="text-center bg-brand-green/20 text-green-300 p-3 rounded-lg">
                <p className="text-sm font-bold">Availability</p>
                <p className="text-2xl font-extrabold">{shelter.available}</p>
                <p className="text-xs">/ {shelter.capacity} spots</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shelters;