import React, { useState, useEffect } from 'react';
import { MoneyFormat, UUID_Format } from '../helpers/DataFormat';
import { BaseURL } from '../helpers/GlobalFunction';

function App(props) {
  const [state, setState] = useState('');

  useEffect(() => {
    return () => {

    }
  }, []);

  return (
    <>
      <div className="profile d-flex p-4 bg-black m-3 rounded position-relative">
        <p className='text-white m-0 col text-center'>
          {UUID_Format(props.order_id)}
        </p>
        <p className='text-white m-0 col text-center'>{props.order_status}</p>
        <p className='text-white m-0 col text-center'>{
          MoneyFormat(props.order_tinhtien)
        } vnd</p>
        <input type="checkbox" name="" id="" className='position-absolute top-50 end-0 translate-middle' />
      </div>
    </>
  )
}

export default App;