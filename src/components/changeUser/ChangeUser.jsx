import React from 'react'
import { useState } from 'react'

import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { changeUser } from '../../redux/adminSlice'


function ChangeUser() {
    const navigate= useNavigate()
  const { name, id } = useSelector(state => state.admin)
  const [username,setUsername] = useState(name)
 const handleEdit=(e)=>{
    e.preventDefault()
    console.log('khkh');
    axios.post("http://localhost:3001/admin/edituser",{username,id}).then((res)=>{
        let data=res.data

        if(data){
            navigate('/admin/')
        }
    })
 }
  return (
    <div>
       <div>
       <div className='OuterSingup'>
              <form className='formSinuppt-5 pe-5 ps-5' style={{border:'1px solid grey',borderRadius:'10px'}} onSubmit={handleEdit}>
              <div className='text-center'>
                    <h4>EDIT USER</h4>
                    </div>
                  <div class="form-outline mb-4">
                      <label class="form-label" for="form2Example1">Username</label>
                      <input type="text" id="form2Example1" value={username} class="form-control" name='username' onChange={(e) => setUsername(e.target.value)} />

                  </div>
                  <div className='text-center'>
                     <button type="submit" class="btn btn-primary btn-block mb-4" onClick={changeUser}>Update</button>
                    </div>


                 



              </form>
          </div>
    </div>
    </div>
  )
}

export default ChangeUser
