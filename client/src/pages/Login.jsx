import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from '../config';
const Login = () => {

    const[formData,setFormData]=useState({
        email:'',
        password:''
    })

    const navigate=useNavigate()

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleLogin= async(e)=>{
        e.preventDefault()
        try{

            const response = await axios.post(`${BASE_URL}/auth/login`, formData);

          
            console.log('Response:', response.data);
          
            const data = response.data;
            console.log(data,"dddddddddddddddd");
            if (!data.success) {
             
              toast.error("Login Failed");
              return;
            }
          
         
            toast.success(data.message);
          
          
            navigate('/home');

        }catch(err){
            console.error(err)
        }
    }

  return (
    <div>

<section className="px-5 lg:px-0 mt-20">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center">
           <span className="text-primaryColor align-middle ">LOGIN</span> 
        </h3>
        <form className="py-4 md:py-0 " onSubmit={handleLogin} >
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your registered Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
            />
          </div>
          <div className="mt-7">
            <button
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              type="submit"
            >
                LOGIN

            </button>
          </div>
          <p className="text-textColor mt-5 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>

    </div>
  )
}

export default Login
