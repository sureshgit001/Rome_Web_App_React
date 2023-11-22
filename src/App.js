import { useEffect, useState } from 'react';
import './App.css';
import RegisterLogIn from './SignUp_SignIn/RegisterLogIn';
import { ClipLoader } from 'react-spinners';
import Dashboard from './Dashboard/Dashboard';
import Cart from './components/Cart';
import Order from './components/Order';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';




function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [item, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(<RegisterLogIn />)
      setLoading(true)
    }, 800);
  }, [])
  const getItems = async () => {
    const itemUrl = 'http://localhost:8081/v1/users/items';
    try {
      const itemsFromDataBsse = await axios.get(itemUrl);
      setItems(itemsFromDataBsse.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilteredItems([]);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    const itemsForSubcategory = item.filter((item) => item.subcategoryId === subcategory);
    setFilteredItems(itemsForSubcategory);
  };

  const handleAddToCart = (item) => {
    // Check if the item is already in the cart
    const existingItem = cartItems.find((cartItem) => cartItem.itemId === item.itemId);
    if (existingItem) {
      // Increase the quantity of the existing item in the cart
      existingItem.quantity += 1;
      setCartItems([...cartItems]);
    } else {

      // Add the item to the cart with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.itemId !== itemId);
    setCartItems(updatedCart);
  };

  const handleIncreaseQuantity = (item) => {
    item.quantity += 1;
    setCartItems([...cartItems]);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...cartItems]);
    } else {
      handleRemoveFromCart(item.id); // Remove the item if the quantity is 0
    }
  };

  const handlePlaceOrder = () => {
    // Perform order placement logic, e.g., sending data to a server
    setIsOrderPlaced(true);
  };
  const [cartSize, setCartSize] = useState(0);
  const handleCartSizeChange = (size) => {
    setCartSize(size);
  };


  return (

    <>

      {loading ? <Routes>
        <Route path='/' element={<RegisterLogIn />} />
        <Route path='/success' element={
          <Dashboard onAddToCart={handleAddToCart} cartSize={cartSize} /> } />
        <Route path='/cart' element={<Cart
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          handleCartSizeChange={
            handleCartSizeChange
          }
        />} />
        <Route path='/place-order' element={<>
          <Order cartItems={cartItems} onPlaceOrder={handlePlaceOrder} />
          {isOrderPlaced && <p>Order placed successfully!</p>}</>} />
      </Routes> || data : <div className='loadingJs'>
        <ClipLoader color="#36d7b7" size={50} />
      </div>}

    </>
  );
}

export default App;
