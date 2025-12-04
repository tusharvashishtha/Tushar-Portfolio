import React from 'react'
import Loader from './Loader/Loader'

const HomePage = () => {
  return (
    <div className='h-[100dvh] w-[100vw] bg-red-700'>{<Loader />}</div>
  )
}

export default HomePage