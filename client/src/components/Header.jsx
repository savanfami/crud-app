import React from "react";
import {Link} from 'react-router-dom'
import { Navbar } from "flowbite-react";



const Header = () => {
  return (

    <>
  <nav className="bg-white border-b border-solid border-b-primaryColor m-5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
         
            <span className="heading text-primaryColor font-bold">USER MANAGEMENT</span>
         
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
          

           

           
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
