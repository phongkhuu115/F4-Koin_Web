import React, { useState, useEffect } from 'react';

function App(props) {
  const [state, setState] = useState('');

  useEffect(() => {
    return () => {

    }
  }, []);

  return (
    <>
      <p className='bg-secondary w-50 rounded-5 p-4 text-white text-justify text-justify'>{props.message.message}</p>
    </>
  )
}

export default App;