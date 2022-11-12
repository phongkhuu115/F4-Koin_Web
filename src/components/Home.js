import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import waitPic from '../assets/waiting.png'
import axios from 'axios';
import { wait } from '@testing-library/user-event/dist/utils';

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
  let [message, setMessage] = useState('');
  useEffect(() => {
    get3lastest().then(res => {
      setLatest(res.data.product.slice());
      setMessage(res.data.message)
    })
  }, [])
  if (message === '') { 
    return (
      <>
        <div className='text-center mx-auto'>
          <p>Bạn chờ xíu shop lấy thông tin nha :3</p>
          <img src={waitPic} alt="" />
        </div>
      </>
    )
  }
  return latest.map(item => {
    return (
      <>
        <Link to='/home/product' className="fish-card order-md-first bg-dark p-3 rounded text-decoration-none new_product position-relative" state={{id: item.productID}}>
          <div className="card">
            <img className="card_img d-block" src={item.imageUrl} alt="" />
          </div>
          <div>
            <h4 className="text-center text-white mt-3" >Tên: {item.productName}</h4>
            <p className="text-center text-white">Giá: {item.productPrice * 24867.50} VND</p>
          </div>
        </Link>
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
  let [message, setMessage] = useState('');
  useEffect(() => {
    get6random().then(res => {
      setRandom(res.data.product.slice());
      setMessage(res.data.message)
    })
  }, [])
  if (message === '') { 
    return (
      <>
        <div className='text-center mx-auto'>
          <p>Bạn chờ xíu shop lấy thông tin nha :3</p>
          <img src={waitPic} alt="" />
        </div>
      </>
    )
  }
  return random.map(item => {
    return (
      <>
        <Link to='/home/product' className="fish-card order-md-first bg-dark p-3 rounded mt-3 text-decoration-none position-relative pick" state={{id: item.productID}}>
          <div className="card">
            <img className="card_img d-block" src={item.imageUrl} alt="" />
          </div>
          <div>
            <h4 className="text-center text-white mt-3" >Tên: {item.productName}</h4>
            <p className="text-center text-white">Giá: {item.productPrice} VND</p>
          </div>
        </Link>
      </>
    )
  })
}
function HomePage() {
  return (
    <>
      <div className='link-section d-flex h-100'>
        <div className="link-half w-50 m-5 d-flex">
          <Link to="/home/shop" className='w-25 m-auto' state={{ name: "Koi Fish" }}>
            <button type="button" class="btn btn-dark fs-2 w-100 btn-redirect">Koi Fish</button>
          </Link>
        </div>
        <div className="link-half w-50 m-5 d-flex">
          <Link to='/home/shop' className='w-25 m-auto' state={{ name: "Tool & Foods" }}>
            <button type="button" class="btn btn-light fs-2 w-100 btn-redirect" >Tools & Foods</button>
          </Link>
        </div>
      </div>
      <div className='newProduct-section d-flex flex-column h-100'>
        <div className='text-center border-bottom position-relative m-5'><h1 className='bg-white py-3 px-5 position-absolute top-50 start-50 translate-middle'>New Arrival</h1></div>
        <div className="items-group d-flex justify-content-between m-5">
          <RenderItem></RenderItem>
        </div>
      </div>
      <div className="pick-product d-flex flex-column">
        <h1 className="text-center m-5 text-uppercase text-white fw-bold">Picked For You</h1>
        <div className="pick-group d-flex flex-wrap justify-content-between mx-5 mb-5">
          <RenderPickItem></RenderPickItem>
        </div>
      </div>
    </>
  )
}

export default HomePage;