import React from 'react'
import Loader from './Loader/Loader'
import STintro from './Loader/STintro/STintro'

const HomePage = () => {
  return (
    <div className='h-[100dvh] w-[100vw] bg-red-700'>{<STintro />}</div>
  )
}

export default HomePage