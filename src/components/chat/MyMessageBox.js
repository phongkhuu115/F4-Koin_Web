import React, { useState, useEffect } from 'react';

function App(props) {
  const [state, setState] = useState('');

  useEffect(() => {
    return () => {

    }
  }, []);

  return (
    <>
      <p className='bg-primary w-50 rounded-5 p-4 text-white text-justify text-justify ms-auto'>{ props.message.message}</p>
    </>
  )
}

export default App;