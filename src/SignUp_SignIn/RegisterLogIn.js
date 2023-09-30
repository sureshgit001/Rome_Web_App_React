import React, { useState, useEffect } from "react";
import './RegisterLogIn.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas, faEnvelope, faLocationDot, faLock, faPhone, faThumbTack, faUser } from "@fortawesome/free-solid-svg-icons";
import WOW from 'wowjs';
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function RegisterLogIn() {
   const [show, setshow] = useState(true);
   const [login, setLogin] = useState({});
   const navigate = useNavigate();
   console.log(login);
   useEffect(() => {
      new WOW.WOW({
         live: false
      }).init();
      getUserDetails();

   }, [])

   const getUserDetails = async () => {
      try {
         const res = await axios.get("http://localhost:8081/v1/users")
         console.log(res.data)
      } catch (error) {
         console.log(error.message)
      }
   }

   const handleChange = (e) => {
      e.preventDefault();
      setLogin(prev => ({
         ...prev,
         [e.target.name]: e.target.value

      }))

   }
   const handleLogin = (e) => {

      e.preventDefault();
      console.log(login)

      // Replace with your API endpoint
      const apiUrl = 'http://localhost:8081/v1/users/login';

      // Replace with your Basic Authentication credentials
      const username = 'ramesh';
      const password = 'Ramesh#123';
      const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);
      const user = {
         userEmail: "ramesh",
         userPassword: "ramesh"
      }

      axios.post(apiUrl, login, {
         headers: {
            'Content-Type': 'application/json', // Set the content type if needed
            'Authorization': basicAuthHeader, // Add the Basic Authentication header
         },
      })
         .then(response => {
            // console.log(response.status)
            if (response.data === true) {
               return navigate('/success')
            }

         })
         .catch(error => {
            console.log('Error fetching data:', error)
         });
   }

     const passwordJsSpan =()=>{
        // document.getElementById("passwordValidspan").style.display="block";
      const password = document.querySelector(".loginPassword").value;
      const spanDetails =  document.querySelectorAll(".js-password");
      //min 8 charecters
         (password.length>=8)? spanDetails[0].style.color="lightgreen":spanDetails[0].style.color="white";
      //lowerAndUpper
         (password.match(/[A-Z]/))? spanDetails[1].style.color="lightgreen":spanDetails[1].style.color="white";
      //spl charecters
        (password.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/))? spanDetails[2].style.color="lightgreen":spanDetails[2].style.color="white";
       
   }

   return (
      <>
         <div className="registerOrLogin">
            <div className="register">

            </div>
            <div className="login wow  pulse">
               <h3 /* style={{color: "red"}}*/ className=" text-center text-light mb-4">{show ? "CUSTOMER LOGIN" : "SIGN UP"}</h3>
               <form>
                  {show ?
                     <>
                        <div class="form-group formInput ">
                           <div className="faIcons"><FontAwesomeIcon icon={faEnvelope} className="facolors" /></div>
                           <div className="inputDiv">
                              <input type="text" onChange={handleChange} name="userEmail" class="form-control  bg-transparent" placeholder="Email" />
                           </div>
                        </div>
                        <div class="form-group formInput">
                           <div className="faIcons"><FontAwesomeIcon icon={faLock} className="facolors" /></div>
                           <div className="inputDiv">
                              <input type="password" name="userPassword" onChange={handleChange} className="form-control bg-transparent loginPassword" placeholder="Password" onKeyUp={passwordJsSpan} />
                           </div>

                        </div>
                        <span id="passwordValidspan">
                           <span className="js-password">- should contain min 8 charecters</span><br />
                           <span className="js-password">- should contain lower and upper-cases</span><br />
                           <span className="js-password">- should contain special charecters</span>
                        </span>
                        <div className="formBtn text-center">
                           <button type="submit" onClick={handleLogin} class="btn text-light bg-danger rounded-0 btn-sm">LOGIN</button>
                        </div>
                     </> :
                     <>
                        <div class="form-group formInput ">
                           <div className="faIcons"><FontAwesomeIcon icon={faUser} className="facolors" /></div>
                           <div className="inputDiv">
                              <input type="text" class="form-control  bg-transparent" placeholder="Name" />
                           </div>
                        </div>
                        <div class="form-group formInput">
                           <div className="faIcons"><FontAwesomeIcon icon={faEnvelope} className="facolors" /></div>
                           <div className="inputDiv">
                              <input type="email" class="form-control bg-transparent" placeholder="Email" />
                           </div>
                        </div>
                        <div class="form-group formInput ">
                           <div className="faIcons"><FontAwesomeIcon icon={faPhone} className="facolors" /></div>
                           <div className="inputDiv">
                              <input type="text" class="form-control  bg-transparent" placeholder="Phone" />
                           </div>
                        </div>
                        <div class="form-group formInput ">
                           <div className="faIcons"><FontAwesomeIcon icon={faEarthAmericas} className="facolors" /></div>
                           <div className="inputDiv">
                              <input type="text" class="form-control  bg-transparent" placeholder="Country" />
                           </div>
                        </div>
                        <div class="form-group formInput ">
                           <div className="faIcons"><FontAwesomeIcon icon={faLocationDot} className="facolors" /></div>
                           <div className="inputDiv">
                              <input type="text" class="form-control  bg-transparent" placeholder="Address" />
                           </div>
                        </div>
                        <div class="form-group formInput ">
                           <div className="faIcons"><FontAwesomeIcon icon={faThumbTack} className="facolors" /></div>
                           <div className="inputDiv">
                              <input type="text" class="form-control  bg-transparent" placeholder="Pincode" />
                           </div>
                        </div>
                        <div class="form-group formInput ">
                           <div className="faIcons"><FontAwesomeIcon icon={faLock} className="facolors" /></div>
                           <div className="inputDiv">
                              <input type="password" class="form-control  bg-transparent" placeholder="Password" />
                           </div>
                        </div>
                        <div className="formBtn text-center">
                           <button type="submit" class="btn text-light bg-danger rounded-0 btn-sm">Register</button>
                        </div>
                     </>
                  }
               </form>
            </div>
            <div className="registerdiv mt-3 text-center text-light">
               <small >{show ? "Don't have an account" : "Already have an account"}</small>
               <div className="heCreateAcc mt-1 ">
                  {show ?
                     <button onClick={() => setshow(false)}
                        className="btn btn-outline-light btn-sm fw-bold rounded-0  ">Create Account Now</button> : <button onClick={() => setshow(true)} className="btn btn-outline-light btn-sm fw-bold rounded-0  ">LogIn Here
                     </button>}
               </div>
            </div>
         </div>
      </>
   )
}