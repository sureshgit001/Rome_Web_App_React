// src/components/ItemList.js

import React from 'react';

const ItemList = ({ items, onAddToCart }) => {
  return (
    <div className='items row row-gap-2 column-gap-2 justify-content-center pt-5'>
      {items.map((item) => (
        <div key={item.itemId} className='col-md-2 '>
          <div className="item m-auto">
          <img src={item.itemUrl} alt={item.itemName} />
          <h4>{item.itemName}</h4>
          <p>${item.itemPrice}</p>
          <button className='btn btn-warning' onClick={() => onAddToCart(item)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ItemList);

