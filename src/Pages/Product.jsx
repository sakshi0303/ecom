import React, { useEffect, useState } from 'react'

const Product = () => {
  const [pdata, setpdata] = useState();
  let getdata=async()=>{
    let raw=await fetch('https://dummyjson.com/products')
    let data=await raw.json()
    console.log("productdats",data);
    setpdata(data.products)

  }

  useEffect(()=>{
    getdata()

  },[])
  return (
    <div>Product
      {/* {
      pdata.map((ele,i)=>{
        return 

      })} */}
    </div>
  )
}

export default Product