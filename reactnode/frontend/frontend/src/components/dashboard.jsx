import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { axios } from 'axios';

export default function Dashboard() {

  const navigate = useNavigate()

  
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/")
    }else{
      fetchAdmin()
    }
  },[])

  const fetchAdmin = async ()=>{
    let token = localStorage.getItem("token")
    await axios.get("http://localhost:1008/allAdmin",{
      Headers : {
         Authorization : token
      }
    }).then((res)=>{
      console.log(res);
      
    })
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={()=>navigate("/")} className='bg-danger text-light ms-2'>LogOut</button>
    </div>  
  );
}