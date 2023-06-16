import React, { useEffect } from 'react'
import './Signup.css'
import { useState } from 'react'
import {Link,Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const navigate=useNavigate()
   
    const [user,setUser]=useState({username:'',password:''})
    const[errors,setErrors]=useState({})
    const validation = {
      username: /^[a-zA-Z0-9]{4,12}$/,
      
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    }
   const handleSignup=async(e)=>{
    e.preventDefault();
     const trimmeduname=user.username.trim();
     if(validation.username.test(trimmeduname)===false){
      setErrors({username:'invalid name'})
      return;
     }
     if(validation.password.test(user.password)===false){
      setErrors({password:'invalid password'})
      return
     }
     try{
      const {data}=await axios.post("http://localhost:3001/signup",{...user},{withCredentials:true})
     console.log(data);
      
      if(data.signup){
      
         navigate('/login')
      }
     }catch(error){
      
     }
     
    
    }

   
  return (
    <div className='OuterSingup'>


      <form className='formSinup pt-3 pe-3 ps-3'  style={{border:'1px solid grey',borderRadius:'10px'}}>
  <div className='text-center'>
    <h3>REGISTER</h3>
  </div>
  <div class="form-outline mb-4">
     <label class="form-label" for="form2Example1">Username</label>
    <input type="email" id="form2Example1" class="form-control" name='username' onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
    {errors.username && <span className="error-message">{errors.username}</span>}
  </div>

  
  <div class="form-outline mb-4">
    <label class="form-label" for="form2Example2">Password</label>
    <input type="password" id="form2Example2" class="form-control" name='password' onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}/>
    {errors.password && <span className="error-message">{errors.password}</span>}
  </div>

 
 <div className='text-center'>
   <button type="button" class="btn btn-primary btn-block mb-4" onClick={handleSignup}>REGISTER</button>
 </div>
  
 

 
  <div class="text-center">
    <p>Already have an account? <a href="#!">sign in</a></p>
   

   
  </div>
</form>
    </div>
  )
}

export default Signup
