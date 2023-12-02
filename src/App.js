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
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [item, setItems] = useState([]);
 

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(<RegisterLogIn />)
      setLoading(true)
    }, 800);
  }, [])
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

  const handlePlaceOrder = () => {
    // Perform order placement logic, e.g., sending data to a server
    setIsOrderPlaced(true);
  };

  return (

    <>

      {loading ? <Routes>
        <Route path='/' element={<RegisterLogIn />} />
        <Route path='/success' element={
          <Dashboard  /> } />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/place-order' element={<>
          <Order onPlaceOrder={handlePlaceOrder} />
          {isOrderPlaced && <p>Order placed successfully!</p>}</>} />
      </Routes> || data : <div className='loadingJs'>
        <ClipLoader color="#36d7b7" size={50} />
      </div>}

    </>
  );
}

export default App;
