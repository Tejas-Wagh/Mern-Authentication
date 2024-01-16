import axios from 'axios';
import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth.jsx';

function Signup() {
    const navigate= useNavigate();
    
    


    const sendSignUpReq= async (username,email,password)=>{
        try{
         
            const response= await axios.post("http://localhost:3000/api/auth/signup",{
                username,
                email,
                password
            });
            const resData= await response.data;
            console.log(resData);
            return resData;
        }catch(error){
            console.log(error);
        }
    }

     function handleSubmit(event){
        event.preventDefault();

        const formdata= new FormData(event.target);
        const email= formdata.get("email");
        const username= formdata.get("username");
        const password= formdata.get("password");
        sendSignUpReq(username,email,password).then(()=>navigate("/login"));

    }
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-center text-3xl font-semibold my-8 '>Sign Up</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" placeholder='Username' className="bg-slate-100 p-3 rounded-lg" />
            <input type="email" name="email" id="email" placeholder='Email' className="bg-slate-100 p-3 rounded-lg"/>
            <input type="password" name="password" id="password" placeholder='Password' className="bg-slate-100 p-3 rounded-lg"/>
            <button className='bg-slate-700 text-white text-xl hover:opacity-95 p-3 rounded-xl disabled:placeholder-opacity-80' >Sign Up</button>
            <OAuth/>
            <div className='flex my-3 gap-2'>
                <p>Have an account?</p>
                <Link to={"/login"} className='text-blue-500'>Log In</Link>
            </div>
        </form>
    </div>
  )
}

export default Signup