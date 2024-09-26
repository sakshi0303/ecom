// #md: medium responsive
import React from 'react'
import { useLocation } from 'react-router-dom'

const View = () => {
    let location=useLocation()
    console.log(location.state);
    let product=location.state
  return (
    <div className="row m-0 p-0 my-5">

        <div className="col-md-6 d-flex flex-content-center bg-warning ">
            <img src={product.thumbnail} alt="" />

        </div>
        <div className="col-md-6 p-3">
            <h5><strong>Brand</strong>:{product.title}</h5> 
            <h5><strong>Brand</strong>:{product.brand}</h5>
            <h4><strong>Brand</strong>:{product.category}</h4>
            <h3 className='my-4'><strong>Description</strong>:{product.description}</h3>
            <button className='btn btn-success'> Add to cart</button>
            
        </div>
    </div>
  )
}

export default View