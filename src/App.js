import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterLogIn from './SignUp_SignIn/RegisterLogIn';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Success from './SignUp_SignIn/Success';



function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(<RegisterLogIn />)
      setLoading(true)
    }, 800);
  }, [])

  return (

    <>

      {loading ?<Routes>
          <Route path='/' element={<RegisterLogIn />} />
          <Route path='/success' element={<Success />} />
        </Routes>||data : <div className='loadingJs'>
        <ClipLoader color="#36d7b7" size={50} />
      </div>}
    {/* <button ><Link to={'/success'}>success</Link></button> */}

    </>
  );
}

export default App;
