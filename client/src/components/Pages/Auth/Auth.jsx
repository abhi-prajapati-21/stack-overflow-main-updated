import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import logo from '../../../assets/icon.png';
import './Auth.css';
import AboutAuth from './AboutAuth';
import { signUp, logIn } from '../../../Action/auth';

const Auth = () => {

  const [isSignup,setIsSignup] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchHandler = () =>{
    setIsSignup(!isSignup)
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter Email and Password")
    }
    if (isSignup){
      if (!name) {
        alert("Enter name to continue")
      }
      dispatch(signUp({name, email, password}, navigate))
    }else{
      dispatch(logIn({email, password}, navigate))
    }

  }

  return (
    <section className='auth-section'>
     { 
       isSignup && <AboutAuth />  // about Auth component
     }
     <div className="auth-container-2">
        {!isSignup && <img src={logo} alt="stack Overflow" className='login-logo'/> }
       
       <form onSubmit={ handelSubmit }>
        {  
          isSignup && (

           <label htmlFor="name">
             <h4>Display Name</h4>
             <input type="name" name='name' id='name' onChange={(e)=>setName(e.target.value)}/>
           </label>
          )
        }
          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name='email' id='email' onChange={(e)=>setEmail(e.target.value)}/>
          </label>
          <label htmlFor="password">
            <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
              <h4>Password</h4>
              {!isSignup && <p style={{color:"#0071e6",fontSize:"13px"}}>Forgot Password?</p>}
            </div>
            <input type="password" name='password' id='password' onChange={(e)=>setPassword(e.target.value)}/>
            {
              isSignup && <p style={{color:"#666767",fontSize:"13px"}}>Password must contain at least eight <br /> charecters, including at least 1 letter and 1 number</p>
            }
          </label>
         { isSignup && 
            <label htmlFor="check">
            <input type="checkbox" name="" id="check" />
            <p style={{fontSize:"13px"}}>Opt-in to receive occasional,<br /> product updates, user research invitation <br /> componey announcements, and digests. </p>
            </label>
          }
          <button type='submit' className='auth-btn'>{isSignup ? 'Sign Up' : 'Login'}</button>
          {
            isSignup && (
              <p style={{color:"#666767",fontSize:"13px"}}>
                By clicking "Sign up",you agree to our
                <span style={{color:"#0071e6"}}> terms of <br /> services</span>
                <span style={{color:"#0071e6"}}> privacy policy</span> and
                <span style={{color:"#0071e6"}}> cookie policy</span>
              </p>
            )
          }
        </form>
          <p>
            {isSignup ? 'Already have an account?': "Dont have an account?"}
            <button type='button' className='handle-switch-btn' onClick={switchHandler}>{isSignup ? 'Login' : 'Signup'}</button>
          </p>
        
     </div>

    </section>
  )
}

export default Auth
