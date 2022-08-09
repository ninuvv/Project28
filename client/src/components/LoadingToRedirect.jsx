import React,{useEffect} from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count,setCount]=useState(5);
    const navigate=useNavigate();

    useEffect(() => {
    const interval= setInterval(()=>{
        setCount((curentcount)=>--curentcount);
    },1000)
    count===0 && navigate("/login");
    return ()=> clearInterval(interval);

    }, [count,navigate])
    
  return (
    <div style={{marginTop:"100px"}}>Redirecting you in {count} sec</div>
  )
}

export default LoadingToRedirect