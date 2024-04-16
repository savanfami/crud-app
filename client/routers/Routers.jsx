import React from 'react'
import {Routes,Route,useNavigate,Navigate} from 'react-router-dom'
import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'
import Home from '../src/pages/Home'

const Routers = () => {
  return (
   <Routes>
    <Route index element={<Login/>} />
    <Route path='/register' element={<Signup/>} /> 
    <Route path='/home' element={<Home/>}/>
   </Routes>
  )
}

export default Routers
