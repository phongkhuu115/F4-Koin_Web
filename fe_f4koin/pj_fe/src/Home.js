import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  var get3lastest = async () => {
    var data = await axios('http://be.f4koin.cyou/api/get3Lastest', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data;
  }
  function RenderItem() {
    var [latest, setLatest] = useState([]);
    useEffect(() => {
      get3lastest().then(res => {
        setLatest(res.data.product.slice());
      })
    }, [])
    return latest.map(item => {
      return (
        <>
          <div>
            <img src={item.imageUrl} alt="" className=''/>
            <p className='fs-4 my-3 text-uppercase fw-bold'>{item.productName}</p>
            <p className='fs-4 '>${item.productPrice}</p>
          </div>
        </>
      )
    })
  }
  return (
    <>
      <div className='link-section d-flex h-100'>
        <div className="link-half w-50 m-5 d-flex">
          <button type="button" class="btn btn-dark fs-2 w-25 m-auto">Fish</button>
        </div>
        <div className="link-half w-50 m-5 d-flex">
          <button type="button" class="btn btn-light fs-2 w-25 m-auto">Tools & Foods</button>
        </div>
      </div>
      <div className='newProduct-section d-flex flex-column h-100'>
        <div className='text-center border-bottom position-relative m-5'><h1 className='bg-white py-3 px-5 position-absolute top-50 start-50 translate-middle'>New Arrival</h1></div>
        <div className="items-group d-flex justify-content-between m-5">
          <RenderItem></RenderItem>
        </div>
      </div>
    </>
  )
}

export default HomePage;