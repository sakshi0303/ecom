import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

// search form on bootstamp
// protected routing
// form onsubmit should have button type=submit <button type="submit"
//  background-color: rgb(255, 0, 0,0.2); 0.2 for transition and
const SignUp = () => {
  let userarr= JSON.parse(window.localStorage.getItem('signupform'))||[]
  const nameref=useRef()
  const emailref=useRef()
  const passwordref=useRef()
  const navigate=useNavigate()

  const handlesubmit=(e)=>{
    
    e.preventDefault()
    let obj={
      name:nameref.current.value,
      email:emailref.current.value,
      password:passwordref.current.value
    }
    console.log(obj);
    if (!obj.name){
      return toast.error("enter valid name",{position:"top-center"})
    }

    if (!obj.email){
      return toast.error("enter valid email",{position:"top-center"})
    }
    if (!obj.password){
      return toast.error("enter valid password",{position:"top-center"})
    }
    let checkUser=userarr.find((ele)=>ele.email===obj.email)
    if (checkUser){
      return toast.error("user already present",{position:"top-center"})
    }
    userarr.push(obj)
    window.localStorage.setItem('signupform',JSON.stringify(userarr))
    toast.success("user registered successfully")
    navigate('/login')
    

  }

  return (
    <div className='signupform' >

    
<form onSubmit={handlesubmit} className='col-6 m-auto'>



  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input ref={nameref} type="text" className="form-control" id="exampleInputName"  />
    
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input ref={emailref} type="email" className="form-control" id="exampleInputEmail1"  />
    
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input ref={passwordref} type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  <p>Already a user? <Link to='/login'>User</Link>Login</p>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default SignUp