import React, { useState, useEffect } from "react";
import './RegisterLogIn.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEarthAmericas, faEnvelope, faLocationDot, faLock, faPhone, faThumbTack, faUser } from "@fortawesome/free-solid-svg-icons";
import WOW from 'wowjs';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CountryValid from "../Utils/CountryValid";


export default function RegisterLogIn() {
   const [show, setshow] = useState(true);
   const [data, setData] = useState({
      userName: '',
      userEmail: '',
      userPhoneNo: '',
      userCountry: '',
      userAddress: '',
      userPincode: '',
      userPassword: ''
   });

   const [errors, setErrors] = useState({});
   const navigate = useNavigate();

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

      setData(prev => ({
         ...prev,
         [e.target.name]: e.target.value

      }))

   }



   //REGISTER
   const handleRegister = (e) => {
      e.preventDefault();


      // Replace with your API endpoint
      const apiUrl = 'http://localhost:8081/v1/user/register';

      // Replace with your Basic Authentication credentials
      const username = 'ramesh';
      const password = 'Ramesh#123';
      const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);

      const valid = formValidations(data);
      if (valid === true) {
         axios.post(apiUrl, data, {
            headers: {
               'Content-Type': 'application/json', // Set the content type if needed
               'Authorization': basicAuthHeader, // Add the Basic Authentication header
            },
         })
            .then(response => {
               if (response.data === false) {
                  document.getElementById("UserValidate").style.display = "block";
               }else{

                  document.getElementById("UserRegistered").style.display = "block";

               }

            })
            .catch(error => {
               console.log('Error fetching data:', error.response.data);
            });
      }
   }

   //LogIn

   const handleLogin = (e) => {

      e.preventDefault();

      // Replace with your API endpoint
      const apiUrl = 'http://localhost:8081/v1/users/login';

      // Replace with your Basic Authentication credentials
      const username = 'ramesh';
      const password = 'Ramesh#123';
      const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);
      // const user = {
      //    userEmail: "ramesh",
      //    userPassword: "ramesh"
      // }

      axios.post(apiUrl, data, {
         headers: {
            'Content-Type': 'application/json', // Set the content type if needed
            'Authorization': basicAuthHeader, // Add the Basic Authentication header
         },
      })
         .then(response => {
            // console.log(response.status)
            if (response.data === true) {
               return navigate('/success')
            } else {
               document.getElementById("EmailOrPAssValid").style.display = "block";
            }

         })
         .catch(error => {
            console.log('Error fetching data:', error)
         });
   }




   const hangleBtnToggle = (change) => {
      const btnChange = document.querySelector(change);
      if (!btnChange.classList.contains('.btnToggle')) {
         turnOffPreviousBtn();
         btnChange.classList.add('btnToggle');
      } else {
         btnChange.classList.remove('btnToggle');
      }
   }

   function turnOffPreviousBtn() {
      const previousChange = document.querySelector('.btnToggle');
      if (previousChange) {
         previousChange.classList.remove('btnToggle');
      }
   }
   return (
      <>
         <div className="backGround">
            <section className="bg-transparent navbar-bg">
               <div className="container">
                  {/* <button onClick={() => setshow(true)} class="nav-item nav-link" href="#">Login</button>
                        <button onClick={() => setshow(false)} class="nav-item nav-link" >SignUp</button> */}
                  <Navbar expand='md' className="bg-transparent">
                     <Container fluid className="bannerHeight">
                        <Navbar.Brand> <img src="/images/Rome-logo.png" alt="" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                           <Nav
                              className="ms-auto "
                              style={{ maxHeight: '100px' }}
                              navbarScroll
                           >
                              <button onClick={() => {
                                 setshow(false);
                                 hangleBtnToggle('.SignUpBtn')
                              }} className="me-4 headerBtns SignUpBtn " >SignUp</button>
                              <button onClick={() => { setshow(true); hangleBtnToggle('.LogInBtn') }} className="headerBtns LogInBtn" >Login</button>
                           </Nav>
                        </Navbar.Collapse>
                     </Container>
                  </Navbar>
               </div>
            </section>
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
                                 <input type="password" name="userPassword" onChange={handleChange} className="form-control bg-transparent loginPassword" placeholder="Password" /*onKeyUp={passwordJsSpan} onFocus={display} onBlur={displayoff}*/ />
                              </div>

                           </div>
                           <span id="EmailOrPAssValid" >Please Enter Valid Email And Password</span>

                           <div className="formBtn text-center">
                              <button type="submit" onClick={handleLogin} class="btn text-light bg-danger rounded-0 btn-sm">LOGIN</button>
                           </div>
                        </> :
                        <>
                           <div class="form-group formInput ">
                              <div className="faIcons"><FontAwesomeIcon icon={faUser} className="facolors" /></div>
                              <div className="inputDiv">
                                 <input type="text" class="form-control  bg-transparent" placeholder="Name" name="userName" onChange={handleChange} />
                              </div>
                           </div>
                           <span className="errorSpan">{errors.userName}</span>
                           <div class="form-group formInput">
                              <div className="faIcons"><FontAwesomeIcon icon={faEnvelope} className="facolors" /></div>
                              <div className="inputDiv">
                                 <input type="email" class="form-control bg-transparent" placeholder="Email" name="userEmail" onChange={handleChange} />
                              </div>
                           </div>
                           <span className="errorSpan">{errors.userEmail}</span>
                           <div class="form-group formInput ">
                              <div className="faIcons"><FontAwesomeIcon icon={faPhone} className="facolors" /></div>
                              <div className="inputDiv">
                                 <input type="text" class="form-control  bg-transparent" placeholder="Phone" name="userPhoneNo" onChange={handleChange} />
                              </div>
                           </div>
                           <span className="errorSpan">{errors.userPhoneNo}</span>
                           <div class="form-group formInput ">
                              <div className="faIcons"><FontAwesomeIcon icon={faEarthAmericas} className="facolors" /></div>
                              <div className="inputDiv">
                                 <input type="text" class="form-control  bg-transparent" placeholder="Country" name="userCountry" onChange={handleChange} />
                              </div>
                           </div>
                           <span className="errorSpan">{errors.userCountry}</span>
                           <div class="form-group formInput ">
                              <div className="faIcons"><FontAwesomeIcon icon={faLocationDot} className="facolors" /></div>
                              <div className="inputDiv">
                                 <input type="text" class="form-control  bg-transparent" placeholder="Address" name="userAddress" onChange={handleChange} />
                              </div>
                           </div>
                           <span className="errorSpan">{errors.userAddress}</span>
                           <div class="form-group formInput ">
                              <div className="faIcons"><FontAwesomeIcon icon={faThumbTack} className="facolors" /></div>
                              <div className="inputDiv">
                                 <input type="text" class="form-control  bg-transparent" placeholder="Pincode" name="userPincode" onChange={handleChange} />
                              </div>
                           </div>
                           <span className="errorSpan">{errors.userPincode}</span>
                           <div class="form-group formInput ">
                              <div className="faIcons"><FontAwesomeIcon icon={faLock} className="facolors" /></div>
                              <div className="inputDiv">
                                 <input type="password" name="userPassword" onChange={handleChange} className="form-control bg-transparent loginPassword" placeholder="Password" onKeyUp={passwordJsSpan} onKeyDown={display} onMouseLeave={displayoff} />
                              </div>
                           </div>
                           <span className="errorSpan">{errors.userPassword}</span>
                           <span></span>
                           <span id="passwordValidspan">
                              <span className="js-password">- should contain min 8 charecters.</span><br />
                              <span className="js-password">- should contain lower and upper-cases. </span><br />
                              <span className="js-password">- should contain special charecters.</span><br />
                              <span className="js-password">- should contain atleast one number.</span>
                           </span>


                           <div className="formBtn text-center">
                              <button type="submit" class="btn text-light bg-danger rounded-0 btn-sm" onClick={handleRegister}>Register</button>
                           </div>
                           <span id="UserValidate">user already exist please login</span>
                           <span id="UserRegistered">Registered Successfully<FontAwesomeIcon style={{ color: "rgb(39, 224, 39)", marginLeft: "5" }} icon={faCheckCircle} /></span>

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
         </div>
      </>
   )
   function formValidations(data) {
      const validCountries = CountryValid();
      const userValidations = {};
      const fieldIsRequired = "Field Is Required"
      //UserName
      if (!data.userName.trim()) {
         userValidations.userName = fieldIsRequired;
      }
       //UserEmail
      if (!data.userEmail.trim()) {
         userValidations.userEmail = fieldIsRequired;
      } else if (!data.userEmail.trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{3}$/)) {
         userValidations.userEmail = "Enter Valid Email";
      }
       //UserPhonneno
      if (!data.userPhoneNo.trim()) {
         userValidations.userPhoneNo = fieldIsRequired;
      } else if (!data.userPhoneNo.trim().match(/^[0-9]{10}$/)) {
         userValidations.userPhoneNo = "Enter Valid PhoneNo";
      }
       //UserCountry
      if (!data.userCountry.trim()) {
         userValidations.userCountry = fieldIsRequired;
      } else if (!validCountries.test(data.userCountry.trim())) {
         userValidations.userCountry = "Enter a valid country";
      }
       //UserAddress
      if (!data.userAddress.trim()) {
         userValidations.userAddress = fieldIsRequired;
      }

       //UserPincode
      if (!data.userPincode.trim()) {
         userValidations.userPincode = fieldIsRequired;
      } else if (!data.userPincode.trim().match(/^[0-9]/)) {
         userValidations.userPincode = "Enter a valid Pincode";
      }
      //UserPassWord
      const ele = document.getElementsByClassName("loginPassword");
      if (!data.userPassword.trim()) {
         ele[0].style.marginBottom = "0";
         userValidations.userPassword = fieldIsRequired;
      } else if (!data.userPassword.trim().match(/[A-Z]/ && /[a-z]/ && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/ && /[0-9]/)) {
         ele[0].style.marginBottom = "0";
         userValidations.userPassword = "Enter a valid Password";
      } else if (!data.userPassword.length >= 8) {
         ele[0].style.marginBottom = "0";
         userValidations.userPassword = "Enter a valid Password";
      }
      let con=!Object.keys(userValidations).includes("userPassword");
      con?ele[0].style.marginBottom = "10px":ele[0].style.marginBottom = "0";
  
      setErrors(userValidations);
      return (Object.keys(userValidations).length === 0)?true:false;
      
   }



}

const passwordJsSpan = () => {

   const password = document.querySelector(".loginPassword").value;
   const spanDetails = document.querySelectorAll(".js-password");
   //min 8 charecters
   (password.length >= 8) ? spanDetails[0].style.color = "lightgreen" : spanDetails[0].style.color = "white";
   //lowerAndUpper
   (password.match(/[A-Z]/) && password.match(/[a-z]/)) ? spanDetails[1].style.color = "lightgreen" : spanDetails[1].style.color = "white";
   //spl charecters
   (password.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) ? spanDetails[2].style.color = "lightgreen" : spanDetails[2].style.color = "white";
   //spl charecters
   (password.match(/[0-9]/)) ? spanDetails[3].style.color = "lightgreen" : spanDetails[3].style.color = "white";

}

const display = () => {
   document.getElementById("passwordValidspan").style.display = "block";
}
const displayoff = () => {
   document.getElementById("passwordValidspan").style.display = "none";
}


