import React, { useState, useEffect } from 'react';

const FilterBar = ({ categories, onCategoryChange, subcategories, onSubcategoryChange }) => {
  return (
    <div className='container mt-2'>
      <h4>Filter</h4>
      <div className='Category mb-4'>
      <select className="form-select" aria-label="Default select example" onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      </div>
          <div className='subCategory'>
          {subcategories.length > 0 && (
        <select className="form-select" aria-label="Default select example" onChange={(e) => onSubcategoryChange(e.target.value)}>
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      )}
          </div>
    </div>
  );
};

export default FilterBar;
