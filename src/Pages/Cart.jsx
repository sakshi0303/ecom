// we cant display data through props.cartdata directly on ui, we can log it
// text-center // heading text on table header in beteenn
// for update   obj.course="sd"  delete obj.name
// um.toFixed(2)} will make the price in string and show only 2 decial point
import React from 'react'
import { useContext } from 'react'
import CartContext from '../Context/CartContext'

const Cart = () => {
  let ctx=useContext(CartContext)
  console.log("DATA",ctx);
  

  const handleDelete =(obj,i)=>{
    let copyarr=[...ctx.cartdata]
    copyarr.splice(i,1)
    ctx.setcartdata(copyarr)

  }

  const handleincrement=(ele,i)=>{
    console.log(ele,i);
    let updatedobj={
      ...ele,
      quantity:ele.quantity+1,
      price:ele.price+(ele.price/ele.quantity)
    }
    console.log(updatedobj);
    let copyarr=[...ctx.cartdata]
    copyarr[i]=updatedobj
    ctx.setcartdata(copyarr)


  }

  const handledecrement=(obj,i)=>{
    console.log(obj,i);
    let updatedobj={
      ...obj,
      quantity:obj.quantity-1,
      price:obj.price-(obj.price/obj.quantity)
    }
    if (updatedobj.quantity<1){
      return handleDelete(obj,i)
    }

    let copyarr=[...ctx.cartdata]
    copyarr[i]=updatedobj
    ctx.setcartdata(copyarr)
  }
  

  // const handleDelete =(obj,idx)=>{

  //   let copyarr=[...props.cartdata]
  //   copyarr.splice(idx,1)
  //   props.setcartdata(copyarr)

  // }

  let sum=0
  ctx.cartdata.forEach((ele)=>{
    sum+=ele.price
  })

  // const handleincrement=(obj,i)=>{
  //   // opdate the element
  //   let updatedobj={
  //     ...obj,
  //     quantity:obj.quantity+1,
  //     price:obj.price+(obj.price/obj.quantity)
  //   }
  //   console.log(updatedobj);

  //   // update in array
  //   let copyarr=[...props.cartdata]
  //   copyarr[i]=updatedobj
  //   props.setcartdata(copyarr)



  // }
  // const handledecrement=(obj,i)=>{
  //   console.log(obj);

   
  //   let updatedobj={
  //     ...obj,
  //     quantity:obj.quantity-1,
  //     price:obj.price-(obj.price/obj.quantity)
  //   }
  //   if (updatedobj.quantity<1){
  //     handleDelete(obj,i)
  //     return
  //   }
  //   console.log(updatedobj);
    
  //   let copyarr=[...props.cartdata]
  //   copyarr[i]=updatedobj
  //   props.setcartdata(copyarr)

  // }

  return (
    <div>
      {/* <table style={{marginTop:"200px"}} className="table table-dark align-middle text-center"></table> */}
      <table className="table table-dark align-middle text-center">
  <thead>
    <tr>
      <th scope="col">Sno</th>
      <th scope="col">Product</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {
    ctx.cartdata.map((ele,index)=>{
      return  <tr>
      <th scope="row">{index+1}</th>
      <td><img src={ele.thumbnail} alt="" height={'150'} width={'150'}/></td>
      <td>{ele.title}</td>
      <td>{ele.price.toFixed(2)} $</td>
      <td><button onClick={()=>handleincrement(ele,index)}className='btn btn-info mx-1'>+</button>{ele.quantity} <button  onClick={()=>{handledecrement(ele,index)}}className='btn btn-info mx-1'>-</button></td>
      <td> <button onClick={()=>handleDelete(ele,index)} className='btn btn-danger'>delete</button></td>
      

    </tr>

    })
  }
    
  </tbody>
</table>
<h3 className='text-center my-2'>Total={sum.toFixed(2)} $</h3>
    </div>

  )
}

export default Cart