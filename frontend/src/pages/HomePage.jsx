import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Link } from 'react-router-dom'
import GlbModel from '../Components/GlbModel'
import { OrbitControls } from '@react-three/drei'

const HomePage = () => {
  return (
    <div
      className='relative w-full h-screen flex flex-col items-center justify-center overflow-hidden'
    >
      <Canvas className="absolute top-0 left-0 w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Load the GLB model */}
        <GlbModel modelPath="/models/globe.glb" />

        {/* Auto-rotate camera */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
      {/* <div className='absolute mt-64 h-28 inset-0 flex flex-col z-10 text-[#9B30FF] font-syncopate text-shadow-lg '> */}
      <div className='absolute mt-[40vh] h-28 inset-0 flex flex-col z-10 text-white font-syncopate text-shadow-lg '>
        <div>
          <h1
            className='lg:text-[120px] text-4xl tracking-tighter font-extrabold text-center lg:mb-16 px-4 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]'
          >
            your home in
          </h1>
          <h1
            className='lg:text-[120px] text-4xl tracking-tighter text-center font-extrabold lg:mb-16 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]'
          >
            college
          </h1>
        </div>
        <div
          className='hover:scale-105 duration-200 mt-4 lg:mt-0 w-full flex items-center justify-center'
        >
          <Link
            to={"/signup"}
            className='font-poppins bg-black text-accent-dark tracking-tighter px-10 py-3 font-semibold lg:text-xl rounded-full hover:text-accent-dark duration-200 '
          >
            Signup
          </Link>
        </div>
        <p className='text-center'>Rotate</p>
      </div>
    </div>
  )
}

export default HomePage
