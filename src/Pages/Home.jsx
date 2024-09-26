// npm i axios
// https://dummyjson.com/products?limit=0&skip=0')
// import axios from 'axios'
// row will be by defaultspace so put have m-0 r-0
//  <div className='row m-0 p-0 bg-info justify-content-center gap-3'>
// in axios we dont have to convert into json
// limit=0&skip=0
// child to child transfer through parent via function 
// skelton, // npm i react-loading-skeleton

// react-toastify to make alert box visually good

// pagination in bootstrap
    // > starting indx , endingidx
    // > const[currentpage,setcurrentpage]=useState(1)
    // let number_of_items=10
    // let lastindex=number_of_item*currentpage
    // let firstindex=last_index-number_of_item
    // let SlicedItem- arr.Slice(startindex-lastindex) (lastidx=10) therefore slieditem=(0-9)
    // number of button: Math.ciel (arr.length/no_of_items)
    // Array(10)..key()->[0,1,2,3,4,5,6,7,8,9] 
    // let buttonArry=[...Array(no_of_button).fill(0).keys()]
    // [0-9]// 
  // active is bydefault blue color bootstamp class

  // onsubmit in form should have type butoon ==submit
  // localstorage: everything should be in string format setitem, getitem.removeitem
  // findindex, find : return 
  
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Demo from '../Components/Demo';
import { Link } from 'react-router-dom';

// npm i react-loading-skeleton
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useContext } from 'react';
import CartContext from '../Context/CartContext';
import Usercontext from '../Context/UserContext';

const Home = () => {
  let ctx = useContext(CartContext)
  console.log(ctx);
  let userctx=useContext(Usercontext)
  //userctx.searchvalue

  const [product, setproduct] = useState([]);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const getdata = async () => {
    setloading(true)
    let res = await axios.get('https://dummyjson.com/products?limit=0&skip=0')
    try {
      console.log("product", res);
      setproduct(res.data.products)
      setloading(false)
    } catch (error) {
      console.log(error);
      seterror(true)
    }
  }
  useEffect(() => {
    getdata()

  }, [])

  // pagination::
  const [currentPage, setcurrentPage] = useState(1);
  let no_of_item=10;
  let endidx=currentPage * no_of_item
  let fntidx=endidx-no_of_item
  let filterarry=product.filter((ele)=>ele.title.toLowerCase().includes(userctx.searchvalue)|| ele.category.toLowerCase().includes(userctx.searchvalue))
  let slicedproductarr=filterarry.slice(fntidx,endidx)
  let noofbutton=Math.ceil(filterarry.length/no_of_item)
  let btnarray=new Array(noofbutton).fill(0)
  //console.log(btnarray);


  const handlenext=()=>{
    if (currentPage<=btnarray.length-1){
      setcurrentPage(currentPage+1)
    }

  }

  const handleprevious=()=>{
    if (currentPage>1){
      setcurrentPage(currentPage-1)
    }

  }




  return (
    <div>
      {loading ? (

        <div className='row m-0 p-0 justify-content-center gap-3'>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            {Array(6).fill(0).map((ele, index) => {
              return <div className='col-md-3 m-4'>
                <Skeleton height={200} />
                <div className='d-flex justify-content-between'>
                  <Skeleton height={100} />
                  <Skeleton height={100} />
                </div>
              </div>

            })
            }
          </SkeletonTheme>

        </div>)
        :
        (
          <div>

            {error === false ?
              (<div className='row m-0 p-0 bg-info justify-content-center gap-3'>
                {
                  slicedproductarr.map((ele, i) => {
                    return ele.thumbnail && <div key={i} className="card" style={{ width: '18rem' }}>
                      <img src={ele.thumbnail} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{ele.title}</h5>
                        <p className="card-text"><strong>Price</strong>{ele.price} $</p>
                        <Link to="/view" state={ele} className="btn btn-primary">View Details</Link>
                        <button className='btn btn-info mx-1' onClick={() => ctx.AddtoCart(ele)} >Add to cart</button>
                      </div>
                    </div>


                  })}



              </div>) :
              <Demo />
            }
          </div>
        )
      }

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li onClick={handleprevious} className="page-item disabled">
            <a className="page-link text-bg-dark">Previous</a>
          </li>
          {/* <li className="page-item active"><a className="page-link" href="#">1</a></li> */}
          
          {btnarray.map((item,i)=>{
            return <li onClick={()=>setcurrentPage(i+1)} className={currentPage===i+1?"page-item active text-bg-dark":"page-item"}><Link className="page-link" href="#">{i+1}</Link></li>
          })}
          <li  onClick={handlenext} className="page-item">
            <a className="page-link text-bg-dark" href="#">Next</a>
          </li>
        </ul>
      </nav>

    </div>
  )
}

export default Home