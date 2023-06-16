import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeUser } from '../../redux/adminSlice'

function AdminHome() {
    const navigate=useNavigate()
    const dispatch = useDispatch()

    const [data,setData]=useState([])
    const [query, setQuery] = useState('')

    useEffect(()=>{
      fetchData()
    },[])
    const fetchData=async(e)=>{
       
        try{
            const response=await axios.get("http://localhost:3001/admin/details")
            
            console.log(response.data);
             setData(response.data.userData)

             const admin=localStorage.getItem('admin')
             const token=JSON.parse(admin)
             if(!token?.data){
               return navigate('/admin/login');
             }else{
               return navigate('/admin/');
             }

        }catch(error){
            console.error(error);
        }
    }

    const deleteData=async(id)=>{
      const {data}=await axios.post("http://localhost:3001/admin/deleteUser",{id})
       setData(data.details)
    }

   

  return (
    <div >
        <div>
            <button className='mt-5' onClick={()=>navigate('/admin/adduser')}>Add User</button>
        </div>
        <div>
        <div class="input-group rounded" style={{width:"500px",marginLeft:'20%'}}>
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"  onChange={(e) => setQuery(e.target.value)}  />
  <span class="input-group-text border-0" id="search-addon">
    <i class="fas fa-search"></i>
  </span>
</div>
        </div>
        <div className='container'>
      <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col"></th>
      <th scope="col"></th>
     
    </tr>
  </thead>
  <tbody>
   {data.filter((user)=>
   user.username.toLowerCase().includes(query)).map((item,index)=>(
     <tr key={index}>
     <th scope="row">{index+1}</th>
     <td>{item.username}</td>
     <td>
      {/* <img src={`/Images/${item.image}`} alt="Card image cap" style={{width:'150px'}}></img> */}
      </td>
     <th scope="col"><button type="button" class="btn btn-primary" 
       onClick={() => {
        dispatch(changeUser({ id: item._id, name: item.username }))
        navigate('/admin/edituser')
    }}
     >Edit</button></th>
      <th scope="col"><button type="button" class="btn btn-danger" onClick={()=>deleteData(item._id)}>Delete</button></th>
     
   </tr>
   ))}
   
  </tbody>
</table>
</div>

    </div>
  )
}

export default AdminHome
