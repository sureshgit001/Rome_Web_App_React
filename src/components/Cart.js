import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import './Cart.css';



const Cart = ({ cartItems, onRemoveFromCart, onIncreaseQuantity, onDecreaseQuantity }) => {
  // Calculate total items and total price
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0);
  const navigate = useNavigate();
  return (
    <>
     <section className="bg-transparent p-0  navbar-bg">
        <div className="container">

          <Navbar className="bg-transparent headerMargin">
            <Container fluid className="bannerHeight">
              <Navbar.Brand> <img src="/images/Rome-logo.png" alt="" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="ms-auto "
                  style={{ maxHeight: '100px' }}
                  navbarScroll
                >
                  <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate('/success')}>Home</Nav.Link>
                    
                    <Nav.Link onClick={() => navigate('/cart')} >cart</Nav.Link>
                  </Nav>
                </Nav>

              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </section>
    {(cartItems.length===0)?
    <>
    <div className='text-center emptyCart'>
      <div className="emptyCartDiv">
      <h1>CART IS EMPTY!</h1>
    <button className='btn btn-dark
    k border-warning text-warning' onClick={()=>navigate('/success')}>Add Items</button>
      </div>
    </div>
    </>
    :
    <>
      <section className='bg-light '>
        <div className='container'>
          <h2>Shopping Cart</h2>
          <div className='align-content-center w-auto'>
            <table className=' cart-table '>
              <thead>
                <tr >
                  <th className='tableData'>Item</th>
                  <th className='tableData'>Item Name</th>
                  <th className='tableData'>Item Price</th>
                  <th className='tableData'>Quantity</th>
                  <th className='tableData'>Amout</th>
                  <th className='tableData'>Action</th>
                </tr>
              </thead>

              {cartItems.map((item) => (
                <tr key={item.itemId} className='column-gap-2'>
                  <td className='tableData' style={{width:200,height:100}}><img src={item.itemUrl} alt={item.itemName} /></td>
                  <td className='tableData'> {item.itemName}</td>
                  <td className='tableData'>₹{item.itemPrice}</td>
                  <td className='tableData'>{item.quantity}</td>
                  <td className='tableData'>₹{item.itemPrice * item.quantity}</td>
                  <td className="cart-buttons tableData">
                    <button className='btn bg-success' onClick={() => onIncreaseQuantity(item)}>+</button>
                    <button className='btn bg-warning' onClick={() => onDecreaseQuantity(item)}>-</button>
                    <button className='btn bg-danger' onClick={() => onRemoveFromCart(item.itemId)}>Remove</button>
                  </td>
                </tr>
              ))}               
            </table>
            <p className='text-center' >Total Price : ₹{totalPrice.toFixed(2)}</p>
            <div className='text-center'>
            </div>
           
          
          </div>
        </div>
      </section>
    </>}
    </>

  );
};

export default React.memo(Cart);
