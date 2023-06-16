import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function AddUser() {
    const navigate=useNavigate()
   
    const [user,setUser]=useState({username:'',password:''})

    const addUser=async(e)=>{
       e.preventDefault()
       const {data}=await axios.post("http://localhost:3001/admin/adduser",{...user},{withCredentials:true})
       console.log(data);
      
        if(data.add){
        
           navigate('/admin/')
        }
      
    }

  return (
    <div>
       <div className='OuterSingup'>
              <form className='formSinup pt-3 pe-3 ps-3' style={{border:'1px solid grey',borderRadius:'10px'}}>
              <div className='text-center'>
                    <h3>ADD USER</h3>
                    </div>
                  <div class="form-outline mb-4">
                      <label class="form-label" for="form2Example1">Username</label>
                      <input type="email" id="form2Example1" class="form-control" name='username' onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />

                  </div>


                  <div class="form-outline mb-4">
                      <label class="form-label" for="form2Example2">Password</label>
                      <input type="password" id="form2Example2" class="form-control" name='password' onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />

                  </div>


                <div className='text-center'>
                <button type="button" class="btn btn-primary btn-block mb-4" onClick={addUser}>Add</button>
                </div>

                 



              </form>
          </div>
    </div>
  )
}

export default AddUser
