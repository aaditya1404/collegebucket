import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    // fetch(`http://localhost:8000/product/details/${id}`) 
    fetch(`https://collegebucket-backend.onrender.com/product/details/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not able to fetch product");
        return res.json();
      })
      .then((data) => {
        setProductInfo(data.product);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, [id]);

  useEffect(() => {
  }, [productInfo]);

  useEffect(() => {
    if (!productInfo?.listedByUserId) return;
    // fetch(`http://localhost:8000/user/${productInfo?.listedByUserId}`)
    fetch(`https://collegebucket-backend.onrender.com/user/${productInfo?.listedByUserId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not able to get user");
        return res.json();
      })
      .then((data) => {
        setUser(data.userInfo);
      })
      .catch((err) => { console.error("Error fetching user info", err) });
  }, [productInfo.listedByUserId])

  useEffect(() => {
  }, [user]);

  return (
    <div className='w-full min-h-screen flex justify-center'>
      <div className='lg:flex bg-primary-dark mb-2 p-10 rounded-2xl border border-white/10 lg:w-[94%] w-full mx-4 lg:max-h-[75vh] mt-24 lg:mt-36'>
        <div className='max-h-72 overflow-hidden rounded-2xl lg:w-[30%] mb-4'>
          <img
            src={`${productInfo.productImageurl}`}
            alt="product"
            height={1000}
            width={1000}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className='max-w-screen-lg'>
          <h1 className='text-textcolor-primary text-3xl font-poppins pb-2 lg:mx-10 lg:pb-4 font-semibold mb-4 border-b border-white/10'>{productInfo?.productname}</h1>
          <p className='text-textcolor-secondary text-xl font-poppins pb-2 lg:px-10 lg:mb-4'>{productInfo?.productdesc}</p>
          <h1 className='text-textcolor-primary lg:px-10 font-poppins text-lg'>Listed By {user.username}</h1>
          <h1 className='text-textcolor-primary lg:px-10 font-poppins text-lg'>Semester {user.semester}</h1>
          <h1 className='text-textcolor-primary lg:px-10 font-poppins text-lg'>Contact {user.contact}</h1>
        </div>
      </div>
    </div>
  );
};

export default Product;

