import React, { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard'

const BuyPage = () => {

  const [allproduct, setAllproduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/product/allproduct")
      .then((res) => {
        if (!res.ok) throw new Error("Not able to fetch product");
        return res.json();
      })
      .then((data) => {
        setAllproduct(data.allProduct);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);


  return (
    <div className='w-full flex justify-center p-8'>
      <div className='w-[98%] grid grid-cols-3 gap-6'>
        {
          allproduct?.map((product)=>(
            <ProductCard key={product._id} product={product}/>
          ))
        }
      </div>
    </div>
  )
}

export default BuyPage
