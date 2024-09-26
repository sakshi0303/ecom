// form: m-0-5 ms ,me m-auto, me-2
// <sup>{props.cartdata.length}</sup> supertag
//<nav className="fixed-top" sticky on top

import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import CartContext from '../Context/CartContext'
import Usercontext from '../Context/UserContext'

const NavBar = () => {
  let ctx=useContext(CartContext)
  let userctx=useContext(Usercontext)
  console.log(userctx);
  let login=userctx.userData.login
  // let searchvalue=userctx.searchvalue setsearchvalue
  // text-dark
  
  const [searchinputvalue, setsearchinputvalue] = useState('');

  const handlelogout=()=>{
    userctx.setsearchvalue('')
    localStorage.removeItem('userdetails')
    userctx.setuserData({login:false,email:''})
    setsearchinputvalue('')
    
  }

  const handlesearch=(e)=>{
    setsearchinputvalue(e.target.value)
    userctx.setsearchvalue(e.target.value.toLowerCase())

  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-dark fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <form className="d-flex ms-auto mt-4 mt-md-auto" role="search">
        <input value={searchinputvalue} onChange={handlesearch} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
      </form>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {login===true && <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>}
        {login===true && <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>}
        {login===true && <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>}
        {login===false && <li className="nav-item">
          <Link className="nav-link" to="/signup">SignUp</Link>
        </li>}

        {login===false && <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>}
        {login===true && <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart <sup>{ctx.cartdata.length}</sup></Link>
        </li>}
        {login===true && 
        <li className="nav-item">
          <Link onClick={handlelogout} className="nav-link" to="#">Logout</Link>
        </li>}
        
      </ul>
      
    </div>
  </div>
</nav>

        
    </div>
  )
}

export default NavBar