import React from 'react'
import CartContext from './CartContext'
import { toast } from 'react-toastify';

import { useState } from 'react';

const CartState = (props) => {
    const [cartdata, setcartdata] = useState([]);
    const AddtoCart=(ans)=>{
      let updans={...ans,quantity:1}

    

                                                                              
        console.log(updans)
        let itemexit= cartdata.find((ele)=>ele.id===updans.id)
        if (itemexit){
            return toast('item already present',{position:'top-center'})
        }

       
        setcartdata([...cartdata,updans])
        toast('item is added successfully in cart',{position:'top-center'})

    }
  return (
    <CartContext.Provider value={{cartdata,AddtoCart,setcartdata}}>
    {props.children}
    </CartContext.Provider>
  )
}

export default CartState