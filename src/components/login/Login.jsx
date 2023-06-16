import React, { useState,useEffect } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setProfile } from '../../redux/userSlice'
function Login() {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });
  const[errors,setErrors]=useState({})
  useEffect(()=>{
    const user=localStorage.getItem('user')
    const token=JSON.parse(user)
    
    
    if(!token?.data){
      return navigate('/login');
    }else{
      return navigate('/');
    }
  },[navigate])
  const handleLogin = async (e) => {
    e.preventDefault();
    
    
      const {data} = await axios.post("http://localhost:3001/login",{...user}, { withCredentials: true })
     
      console.log(data);

      if(data.error){
        setErrors({username:data.error})
        return
      }
      else if(data.pswdError){
        setErrors({password:data.pswdError})
        return
      }
    //   if(data.username.test(user.username)===false){
    //      setErrors({username:'invalid username'})
    //      return
    //   }
    //   if(data.password.test(user.password)===false){
    //     setErrors({password:'invalid password'})
    //     return
    //  }
      
      if (data.login) {
        
        localStorage.setItem('user',JSON.stringify(data))
        dispatch(setProfile({image:data.user.image, username:data.user.username, userid:data.user._id}))
        return navigate('/');
      }
    }
  
    
  return (
    <div>
       <div className='OuterSingup'>
      <form className='formSinup pt-3 pe-3 ps-3'  style={{border:'1px solid grey',borderRadius:'10px'}} >
      <div className='text-center'>
    <h3>USER LOGIN</h3>
  </div>
  <div class="form-outline mb-4">
     <label class="form-label" for="form2Example1">Username</label>
    <input type="text" id="form2Example1" class="form-control" name='username' onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
    {errors.username && <span className="error-message text-danger">{errors.username}</span>}
 
  </div>

  
  <div class="form-outline mb-4">
    <label class="form-label" for="form2Example2">Password</label>
    <input type="password" id="form2Example2" class="form-control" name='password' onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}/>
    {errors.password && <span className="error-message text-danger">{errors.password}</span>}
  </div>

 
 <div className='text-centr'>
   <button type="button" class="btn btn-primary btn-block mb-4 " onClick={handleLogin}>Login</button>

 </div>
  
 
  <div class="text-center">
    <p>Already have an account? <a href="#!">sign in</a></p>
   

   
  </div>
 
 
</form>
    </div>
    </div>
  )
}

export default Login
