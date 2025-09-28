import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProfilePage = () => {

  const { user, setUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [userProduct, setUserProduct] = useState();

  // User profile info states
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [contact, setContact] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // fetch(`http://localhost:8000/user/${user?._id}`)
    fetch(`https://collegebucket-backend.onrender.com/user/${user?._id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not able to fetch user");
        return res.json();
      })
      .then((data) => {
        setUserInfo(data.userInfo);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, [user?._id]);

  useEffect(() => {
    // fetch(`http://localhost:8000/product/${user?._id}`)
    fetch(`https://collegebucket-backend.onrender.com/product/${user?._id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not able to fetch user");
        return res.json();
      })
      .then((data) => {
        setUserProduct(data.userProduct);
      })
      .catch((err) => console.error("Error fetching", err));
  }, [])

  async function addUserProfileInfo(userId) {
    try {
      // let res = await fetch(`http://localhost:8000/user/adduserprofile`, {
      let res = await fetch(`https://collegebucket-backend.onrender.com/user/adduserprofile`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          userId,
          department,
          semester,
          contact,
          about
        })
      });
      let data = await res.json();
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addUserProfileInfo(user?._id);
  }

  console.log(userProduct);

  return (
    <div className='h-screen w-full lg:flex gap-7'>

      <div className='lg:pt-36 lg:pl-7 lg:w-sm pt-24 mx-4 lg:mx-0'>
        <div className='bg-primary-dark border border-white/10 inline-block p-10 rounded-2xl lg:max-w-sm w-full'>
          <h1 className='text-4xl font-bold font-poppins mb-4 text-textcolor-primary'>Hello, <span className='text-accent'>{user.username}</span> 👋</h1>
          <p className='text-2xl tracking-tighter font-poppins text-textcolor-secondary mb-4 border-b border-white/10 pb-4'>Welcome to College Bucket</p>

          {
            userInfo?.department ? (
              <div className='font-poppins'>
                <div>
                  <h1 className='text-xl text-textcolor-secondary'>About me</h1>
                  <p className='text-lg text-textcolor-primary'>{userInfo.about}</p>
                </div>
                <div className='text-textcolor-secondary'>
                  <p>And I'm from {userInfo.department} Department <br /> {userInfo.semester} Semester.</p>
                </div>
                <h3 className='text-textcolor-secondary mb-2'>Contact me at +91-{userInfo.contact}</h3>
                <button className='text-accent'>Edit Profile</button>
              </div>
            ) : (
              <>
                <h3 className='text-lg text-textcolor-primary font-poppins mb-2'>Let's complete your profile</h3>
                <form className='max-w-md' onSubmit={(e) => handleSubmit(e)}>
                  <div className='flex items-center justify-center gap-2 mb-2'>
                    <div>
                      <label htmlFor="department" className='text-xs text-textcolor-secondary'>Enter your department</label>
                      <input
                        onChange={(e) => setDepartment(e.target.value)}
                        name='department'
                        type="text"
                        placeholder='Department'
                        className='w-full px-4 py-2 bg-primary-light outline-none text-textcolor-primary rounded-md'
                      />
                    </div>
                    <div>
                      <label htmlFor="semester" className='text-xs text-textcolor-secondary'>Enter your semester</label>
                      <input
                        onChange={(e) => setSemester(e.target.value)}
                        name='semester'
                        type="text"
                        placeholder='Semester'
                        className='w-full px-4 py-2 bg-primary-light outline-none text-textcolor-primary rounded-md'
                      />
                    </div>
                  </div>
                  <div className='mb-2'>
                    <label htmlFor="contact" className='text-xs text-textcolor-secondary'>Enter your Contact Number</label>
                    <input
                      onChange={(e) => setContact(e.target.value)}
                      name='contact'
                      type="text"
                      placeholder='+91 -'
                      className='w-full px-4 py-2 bg-primary-light outline-none text-textcolor-primary rounded-md'
                    />
                  </div>
                  <div>
                    <label htmlFor="about" className='text-xs text-textcolor-secondary'>About Yourself</label>
                    <textarea
                      name='about'
                      onChange={(e) => setAbout(e.target.value)}
                      type="text"
                      placeholder='What your peers wants to know about you.'
                      className='w-full px-4 py-2 bg-primary-light outline-none text-textcolor-primary rounded-md resize-none mb-4'
                    />
                  </div>
                  <button
                    type='submit'
                    className='text-accent font-semibold bg-black text-lg px-8 py-2 rounded-full w-full hover:text-accent-light '
                  >
                    Submit
                  </button>
                </form>
              </>
            )
          }
        </div>
      </div>

      <div className='lg:pt-36 lg:w-2/3 pt-4 mx-4 lg:mx-0 font-poppins '>
        <div className='bg-primary-dark border border-white/10 rounded-2xl p-10 '>
          <h1 className='text-textcolor-primary text-xl mb-4 border-b border-white/10 pb-2'>Listed Products</h1>
          <ul className='grid lg:grid-cols-3 grid-cols-2'>
            {userProduct?.map((product) => (
              <Link to={`/buy/product/${product._id}`}>
                <li
                  key={product._id}
                  className='text-textcolor-secondary hover:translate-x-2 duration-200'
                >
                  {product?.productname}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className='bg-primary-dark border border-white/10 rounded-2xl p-10 lg:mt-7 mt-4'>
          <h1 className='text-textcolor-primary text-xl mb-4 border-b border-white/10 pb-2'>Products Brought</h1>
          <Link to={"/buy"} className='text-textcolor-secondary'>Buy some product</Link>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
