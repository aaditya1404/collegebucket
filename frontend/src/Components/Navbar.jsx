import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { RiMenu3Fill } from "react-icons/ri";

const Navbar = () => {

  const { user, setUser } = useContext(AuthContext);
  const [nav, setNav] = useState(false);

  const navigate = useNavigate();

  async function handleLogout() {
    navigate("/");
    await fetch("http://localhost:8000/user/logout", {
      method: "GET",
      credentials: "include"
    });
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <div className='w-full flex flex-col lg:flex lg:items-center lg:justify-center lg:p-8 z-50 fixed'>
      <div className='flex items-center justify-around bg-primary-dark/60 backdrop-blur-md border border-white/10 shadow-lg  lg:w-[98%] rounded-2xl py-4 mx-4 mt-4'>
        <div>
          <Link to={"/"} className='text-2xl tracking-tighter font-bold font-poppins text-accent-light'>C<span className='text-textcolor-primary'>ollege Bucket</span></Link>
        </div>
        <div className='lg:hidden'>
          <RiMenu3Fill
            onClick={() => setNav(!nav)}
            className='text-2xl text-textcolor-primary font-bold'
          />
        </div>
        <div className='text-textcolor-secondary lg:items-center gap-4 text-lg font-semibold hidden lg:block'>
          <Link to={"/buy"} className='px-4'>Buy</Link>
          <Link to={"/sell"}>Sell</Link>
        </div>
        {
          user ? (
            <div className='lg:flex gap-4 hidden'>
              <button onClick={handleLogout} className='bg-black text-white px-8 py-2 font-semibold rounded-full'>Logout</button>
              <Link to={"/profile"} className='bg-black text-white px-8 py-2 font-semibold rounded-full'>Profile</Link>
            </div>
          ) : (
            <Link to={"/login"} className='bg-black text-accent hover:text-accent-light px-8 py-2 font-semibold rounded-full hidden lg:block'>Login</Link>
          )
        }

      </div>
      {nav && (
        <div className='w-full flex justify-end'>
          <div
            className='lg:hidden w-36 bg-primary-dark/60 backdrop-blur-md text-textcolor-primary font-poppins flex flex-col justify-center items-center rounded-2xl border border-white/10 mt-2 mx-4 transition-all duration-300 ease-out transform opacity-0 translate-y-[-10px] animate-fadeSlideDown'
            onClick={()=>setNav(!nav)}
          >
            <Link to={"/buy"} className='py-1 '>Buy</Link>
            <Link to={"/sell"} className='py-1'>Sell</Link>
            {
              user ? (
                <div className='flex flex-col items-center justify-center'>
                  <Link
                    to={"/profile"}
                    className='py-1'
                  >
                    Profile</Link>
                  <button
                    onClick={handleLogout}
                    className='py-1'
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to={"/login"} className='py-1'>Login</Link>
              )
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
