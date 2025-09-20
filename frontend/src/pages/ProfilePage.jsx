import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {

  const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className='h-screen w-full'>
      <div className='py-32 px-11'>
        <div className='bg-[#ffd5c3] inline-block p-10 rounded-2xl max-w-md'>
          <h1 className='text-4xl font-bold font-poppins mb-4 text-[#3D065F]'>Hello, {user.username} 👋</h1>
          <p className='text-2xl tracking-tighter font-poppins'>Welcome to College Bucket</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
