import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../Redux/actions/cartActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



const Cart = () => {

  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <>
      {/* <section className="bg-transparent p-0  navbar-bg">
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
      </section> */}
      {(cartItems.length === 0) ?
        <>
          <div className='text-center emptyCart'>
            <div className="emptyCartDiv">
              <h1>CART IS EMPTY!</h1>
              <button className='btn btn-dark
    k border-warning text-warning' onClick={() => navigate('/success')}>Add Items</button>
            </div>
          </div>

        </>
        :
        <>
          {/* <section className='bg-light '>
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
                      <td className='tableData' style={{ width: 200, height: 100 }}><img src={item.itemUrl} alt={item.itemName} /></td>
                      <td className='tableData'> {item.itemName}</td>
                      <td className='tableData'>₹{item.itemPrice}</td>
                      <td className='tableData'>{item.quantity}</td>
                      <td className='tableData'>₹{item.itemPrice * item.quantity}</td>
                      <td className="cart-buttons tableData">
                        <button className='btn bg-success' onClick={() => dispatch(increaseQuantity(item.itemId))}>+</button>
                        <button className='btn bg-warning' onClick={() => dispatch(decreaseQuantity(item.itemId))}>-</button>
                        <button className='btn bg-danger' onClick={() => dispatch(removeFromCart(item.itemId))}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </table>
                <p className='text-center' >Total Price : ₹{totalPrice.toFixed(2)}</p>
                <p className='text-center' >Total items : {cartSize}</p>
                <div className='text-center'>
                </div>


              </div>
            </div>
          </section> */}

          <section className="h-100 gradient-custom">
            <div className="container py-5">
              <div className="row d-flex justify-content-center my-4">
                <div className="col-md-8">
                  <div className="card mb-4">
                    <div className="card-header py-3">
                    <div className="pb-3">
  <h3 onClick={() => navigate('/success')} className="mb-0" style={{ cursor: "pointer" }}>
    <span className="text-body">
      <i className="fas fa-long-arrow-alt-left me-2"></i>Back to shop
    </span>
  </h3>
</div>
                      <h5 className="mb-0">Cart - {cartItems.length} items</h5>
                    </div>
                    <div className="card-body">


                      {/* Single item */}
                      <div className="row">
                        {

                          cartItems.map((item) => (
                            <>
                              <div className="col-lg-3 col-md-12 mb-4 mb-lg-0" key={item.itemId} >
                                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                  <img src={item.itemUrl}
                                    className="w-100" alt="Blue Jeans Jacket" />
                                  <a href="#!">
                                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                  </a>
                                </div>
                              </div>

                              <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                <p><strong>{item.itemName}</strong></p>
                                <p>Description: {item.itemDescription}</p>

                                <button type="button" className="btn btn-primary btn-sm me-1 mb-2"
                                  data-mdb-toggle="tooltip"
                                  title="Remove item"
                                  onClick={() => dispatch(removeFromCart(item.itemId))}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                                <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                                  title="Move to the wish list">
                                  <i className="fas fa-heart"></i>
                                </button>
                              </div>

                              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
                                  <button className="btn btn-primary px-3 me-2"
                                    onClick={() => dispatch(decreaseQuantity(item.itemId))}>
                                    <i className="fas fa-minus"></i>
                                  </button>

                                  <div className="form-outline">
                                    <input id="form1" min="0" name="quantity" value={item.quantity} type="text" className="form-control" />
                                    <label className="form-label" htmlFor="form1">Quantity</label>
                                  </div>

                                  <button className="btn btn-primary px-3 ms-2"
                                    onClick={() => dispatch(increaseQuantity(item.itemId))}>
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>

                                <p className="text-start text-md-center">
                                  <strong>₹ {item.itemPrice}</strong>
                                </p>
                              </div>



                              {/* Single item */}

                              < hr className="my-4" />
                            </>
                          ))
                        }
                      </div>
                      {/* Single item */}
                    </div>
                  </div>
                  <div className="card mb-4">
                    <div className="card-body">
                      <p><strong>Expected shipping delivery</strong></p>
                      <p className="mb-0">12.10.2020 - 14.10.2020</p>
                    </div>
                  </div>
                  <div className="card mb-4 mb-lg-0">
                    <div className="card-body">
                      <p><strong>We accept</strong></p>
                      <img className="me-2" width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                        alt="Visa" />
                      <img className="me-2" width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                        alt="American Express" />
                      <img className="me-2" width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                        alt="Mastercard" />
                      {/* <img className="me-2" width="45px"
                      src="https://icons8.com/icon/CaSfJLdM4LTY/paypal"
                      alt="PayPal acceptance mark" /> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h5 className="mb-0">Summary</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          Products
                          <span>₹{totalPrice.toFixed(2)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                          Shipping
                          <span>Gratis</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>Total amount</strong>
                            {/* <strong>
                            <p className="mb-0">(including VAT)</p>
                          </strong> */}
                          </div>
                          <span><strong>₹{totalPrice.toFixed(2)}</strong></span>
                        </li>
                      </ul>

                      <button type="button" className="btn btn-primary btn-lg btn-block">
                        Go to checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </>}
    </>

  );
};

export default React.memo(Cart);
