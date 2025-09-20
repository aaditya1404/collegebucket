import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const { user, setUser } = useContext(AuthContext);

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
    <div className='w-full flex items-center justify-center p-8 fixed'>
      <div className='flex items-center justify-around bg-white w-[98%] rounded-2xl py-4'>
        <div>
          <Link to={"/"} className='text-2xl tracking-tighter font-bold font-poppins'>College Bucket</Link>
        </div>
        <div className='flex items-center gap-4 text-lg font-semibold'>
          <Link to={"/buy"} className=''>Buy</Link>
          <Link to={"/sell"}>Sell</Link>
        </div>
        {
          user ? (
            <div className='flex gap-4'>
              <button onClick={handleLogout} className='bg-black text-white px-8 py-2 font-semibold rounded-full'>Logout</button>
              <Link to={"/profile"} className='bg-black text-white px-8 py-2 font-semibold rounded-full'>Profile</Link>
            </div>
          ) : (
            <Link to={"/login"} className='bg-black text-white px-8 py-2 font-semibold rounded-full'>Login</Link>
          )
        }

      </div>
    </div>
  )
}

export default Navbar
