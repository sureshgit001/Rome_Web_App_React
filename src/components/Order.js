// src/components/Order.js

import React from 'react';

const Order = ({ cartItems, onPlaceOrder }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0);
  return (
    <div>
      <h2>Order Summary</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.itemId}>
            {item.itemName} - ₹{item.itemPrice * item.quantity}
            
          </li>

        ))}
        <p>total price: ₹{totalPrice}</p>
      </ul>
      <button onClick={onPlaceOrder}>Place Order</button>
    </div>
  );
};

export default React.memo(Order) ;
