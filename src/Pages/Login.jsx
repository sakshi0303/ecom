//Protected Route: login? via contditional rendering

import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Usercontext from '../Context/UserContext'

const Login = () => {

  let userctx=useContext(Usercontext)
  console.log("userctx",userctx);

  let userarr= JSON.parse(window.localStorage.getItem('signupform'))||[]
  const emailref=useRef()
  const passwordref=useRef()
  const navigate=useNavigate()

  const handlesubmit=(e)=>{
    
    e.preventDefault()
    let obj={
      email:emailref.current.value,
      password:passwordref.current.value
    }
    console.log(obj);

    if (!obj.email){
      return toast.error("enter valid email",{position:"top-center"})
    }
    if (!obj.password){
      return toast.error("enter valid password",{position:"top-center"})
    }
    let checkUser=userarr.find((ele)=>ele.email===obj.email)
    console.log(checkUser)
    if (checkUser){
      if (checkUser.password===obj.password){
        userctx.setuserData({login:true,email:checkUser.email})
        localStorage.setItem('userdetails',JSON.stringify({login:true,email:checkUser.email}))

        toast.success("user login successfully")
        navigate('/')
      }
      //   let checkPassword=checkUser.password===obj.password
      //let checkPassword=userarr.find((ele)=>ele.password===obj.password)
      // if (checkPassword){
      //   toast.success("user login successfully")
      //   navigate('/')
      // }
      else{
        return toast.error("invalid credential",{position:"top-center"})
      }
      
    } else{return toast.error("user not present",{position:"top-center"})}
    
  
    

  }
  return (
    <div className='signupform' >

    
<form onSubmit={handlesubmit} className='col-6 m-auto'>


  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input ref={emailref} type="email" className="form-control" id="exampleInputEmail1"  />
    
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input ref={passwordref} type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  <p>New user? <Link to='/signup'>Register</Link></p>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Login