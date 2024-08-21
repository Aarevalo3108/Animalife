import React, { useState } from 'react';

function Filters({ onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="w-64 h-full gap-6 p-6 bg-white shadow-lg  flex flex-col jusftify-center items-center ">
      <div className="mb-6 flex flex-col justify-center items-center">
        <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
        <ul className="text-gray-600">
          {['Dogs', 'Cats', 'Fish', 'Birds'].map(category => (
            <li key={category} className="py-1">
              <button 
                className={`block w-full text-left ${selectedCategory === category ? 'font-bold text-black' : ''}`} 
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Prices</h3>
        <input type="range" min="1" max="100" className="w-full" />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">Brands</h3>
        <ul className="text-gray-600">
          {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5', 'Brand 6'].map(brand => (
            <li key={brand} className="py-1">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Filters;
