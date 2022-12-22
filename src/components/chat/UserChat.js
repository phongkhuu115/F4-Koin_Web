import React, { useState, useEffect } from 'react';

function App(props) {
  const [state, setState] = useState('');

  function getHourAndMinute(time) {
    return time.slice(12, 16);
  } 
  useEffect(() => {

  }, []);

  return (
    <>
      <div className='p-2'>
        <p className='chat-page__user fw-bold'>{ props.item.username}</p>
        <div className='d-flex'>
          <p className='message fs-3 me-5'>{ props.item.last_message}</p>
          <p className='fs-3'>{}</p>
        </div>
      </div>
    </>
  )
}

export default App;