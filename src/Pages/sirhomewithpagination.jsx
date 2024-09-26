import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Demo from '../components/Demo';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import CartContext from '../context/CartContext';


const Home = () => {
  const [products, setproducts] = useState([]);
  // console.log("one")
  // let x=10;
  let ctx = useContext(CartContext)
  console.log(ctx)
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const getAllData = async()=>{
    setloading(true)
    try {
      let res = await axios.get('https://dummyjson.com/products?limit=0&skip=0')
      console.log(res.data.products)
      setproducts(res.data.products)

      setloading(false)
    } catch (error) {
        console.log(error)
        seterror(true)
    }
  }

  useEffect(()=>{
    getAllData()
  },[])


  const handleAdd=()=>{

  }
  const [currentPage, setcurrentPage] = useState(1);
    let itemPerPage = 10;
    let lastIndex = itemPerPage * currentPage;
    let firstIndex = lastIndex - itemPerPage ;
    let slicedArr = products.slice(firstIndex,lastIndex)
    let noOfButtons = Math.ceil(products.length/itemPerPage)
    console.log(noOfButtons) //20
    let btnArr = new Array(noOfButtons).fill(0)
    console.log(btnArr)

  const handlePrev = ()=>{
        if(currentPage>1){
          setcurrentPage(currentPage-1)
        }
  }

  const handleNext = ()=>{
      if(currentPage<=btnArr.length-1){
        setcurrentPage(currentPage+1)
      }
  }

  return (
    <div>
      {loading ? (
        <div className="row m-0 p-0 p-3 justify-content-center gap-3">
          {Array(6).fill(0).map(() => (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <div className="col-md-3 mb-4">
                <Skeleton height={300} />
                <div className="d-flex justify-content-between">
                  <Skeleton width={100} />
                  <Skeleton width={100} />
                </div>
              </div>
            </SkeletonTheme>
          ))}
        </div>
      ) : (
        <div>
          <div className='row m-0 p-0 p-3 justify-content-center gap-3'>
        {
          slicedArr.map((ele)=>{
            return ele.thumbnail && <div className="card" style={{width: '18rem'}}>
              <img src={ele.thumbnail} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{ele.title}</h5>
                <p className="card-text"><strong>Price:</strong> {ele.price} $</p>
                <Link to="/view" state={ele} className="btn btn-primary">View Details</Link>
                <button onClick={()=>ctx.addToCart(ele)} className='btn btn-success mx-1'>Add to cart</button>
              </div>
            </div>
          })
        }
      </div>
      <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center flex-wrap">
    <li onClick={handlePrev} className="page-item disabled">
      <a className="page-link">Previous</a>
    </li>
   {btnArr.map((item,key)=>{
    return  <li onClick={()=>setcurrentPage(key+1)} className={currentPage===key+1? "page-item active":"page-item"}><Link className="page-link" href="#">{key+1}</Link></li>
   })}

    <li onClick={handleNext} className="page-item">
      <a className="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>

        </div>
        
      )}
    </div>
  )
}

export default Home