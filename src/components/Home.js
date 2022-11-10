import '../Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

var get3lastest = async () => {
  let data = await axios('http://be.f4koin.cyou/api/get3Latest', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data;
}
function RenderItem() {
  let [latest, setLatest] = useState([]);
  useEffect(() => {
    get3lastest().then(res => {
      setLatest(res.data.product.slice());
    })
  }, [])
  return latest.map(item => {
    return (
      <>
        <div className='h-100'>
          <img src={item.imageUrl} alt="" className='' />
          <p className='fs-4 my-3 text-uppercase fw-bold'>{item.productName}</p>
          <p className='fs-4 '>${item.productPrice}</p>
        </div>
      </>
    )
  })
}
var get6random = async () => {
  let data = await axios('http://be.f4koin.cyou/api/get6Random', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data;
}
function RenderPickItem() {
  let [random, setRandom] = useState([]);
  useEffect(() => {
    get6random().then(res => {
      setRandom(res.data.product.slice());
    })
  }, [])
  return random.map(item => {
    return (
      <>
        <div className='h-100'>
          <img src={item.imageUrl} alt="" className='' />
          <p className='fs-4 my-3 text-uppercase fw-semibold'>{item.productName}</p>
          <p className='fs-4 text-light'>${item.productPrice}</p>
        </div>
      </>
    )
  })
}
function HomePage() {
  return (
    <>
      <div className='link-section d-flex h-100'>
        <div className="link-half w-50 m-5 d-flex">
          <Link to="/home/shop" className='w-25 m-auto' state={{name:"Koi Fish"}}>
            <button type="button" class="btn btn-dark fs-2 w-100 btn-redirect">Koi Fish</button>
          </Link>
        </div>
        <div className="link-half w-50 m-5 d-flex">
          <Link to='/home/shop' className='w-25 m-auto' state={{name:"Tool & Foods"}}>
            <button type="button" class="btn btn-light fs-2 w-100 btn-redirect" >Tools & Foods</button>
          </Link>
        </div>
      </div>
      <div className='newProduct-section d-flex flex-column h-75'>
        <div className='text-center border-bottom position-relative m-5'><h1 className='bg-white py-3 px-5 position-absolute top-50 start-50 translate-middle'>New Arrival</h1></div>
        <div className="items-group d-flex justify-content-between m-5">
          <RenderItem></RenderItem>
        </div>
      </div>
      <div className="pick-product d-flex flex-column">
        <h1 className="text-center m-5 text-uppercase text-white fw-bold">Picked For You</h1>
        <div className="pick-group d-flex flex-wrap justify-content-between m-5">
          <RenderPickItem></RenderPickItem>
        </div>
      </div>
    </>
  )
}

export default HomePage;