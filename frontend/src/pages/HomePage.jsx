import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='text-[#3D065F] font-syncopate'>
        <h1 className='text-[120px] tracking-tighter font-extrabold text-center -mb-20'>your home in</h1>
        <h1 className='text-[120px] tracking-tighter text-center font-extrabold'>college</h1>
      </div>
      <div>
        <Link to={"/signup"} className='font-poppins bg-black text-white tracking-tighter px-10 py-3 font-semibold text-xl rounded-full'>Signup</Link>
      </div>
    </div>
  )
}

export default HomePage
