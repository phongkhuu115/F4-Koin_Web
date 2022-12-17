import React, { useState, useEffect, useRef } from 'react';
import { MoneyFormat } from '../helpers/DataFormat';

function App(props) {
  const [state, setState] = useState('');
  const statusRef = useRef(null)
  function handleEdit() {
    const overlay = document.querySelector('.edit-popup')
    overlay.style.display = 'flex'
    sessionStorage.setItem('edit_prod', props.id)
  }
  useEffect(() => {
  }, []);

  return (
    <>
      <div className='d-flex align-items-center py-3 border-bottom'>
        <input type="checkbox" name="main-checkbox" id="main-checkbox" className='me-5 item-box' />
        <p className='fs-3 mb-0 product__col text-center text-wrap'>{props.name}</p>
        <p className='fs-3 mb-0 product__col text-center'>{props.email}</p>
        <p className='fs-3 mb-0 product__col text-center'>{props.username}</p>
        <p className='fs-3 mb-0 product__col text-center'>{props.phone}</p>
        <p className='fs-3 mb-0 product__col text-center'>
          {props.role}
        </p>
        <p className='text-light fs-2 fw-semibold mb-0 btn btn-secondary col ms-5 btn-edit' onClick={handleEdit}>
          <i class="fa-solid fa-pen-to-square"></i>
        </p>
      </div>
    </>
  )
}

export default App;