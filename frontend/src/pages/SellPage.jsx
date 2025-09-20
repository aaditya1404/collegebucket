import { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';

const SellPage = () => {

  const [productname, setProductname] = useState("");
  const [productdesc, setProductdesc] = useState("");
  const [productprice, setProductprice] = useState("");
  const [userProduct, setUserProduct] = useState([]);
  const [logedInUser, setLogedInUser] = useState(() => {
    const userString = localStorage.getItem("user")
    return userString ? JSON.parse(userString) : null
  });

  useEffect(() => {
    if (!logedInUser?._id) return; 
    fetch(`http://localhost:8000/product/${logedInUser?._id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not able to fetch product");
        return res.json();
      })
      .then((data) => {
        setUserProduct(data.userProduct);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  async function addProduct() {
    let res = await fetch("http://localhost:8000/product/add", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productname,
        productdesc,
        productprice,
        listedByUserId: logedInUser?._id
      })
    });
    const data = await res.json();
    alert(data.message);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addProduct();
  }


  return (
    <div className=' flex items-center justify-center h-[calc(100vh-200px)] overflow-hidden w-full'>
      {
        logedInUser ? (
          <>
            <div className=' w-1/2'>
              {
                userProduct?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              }
            </div>
            <div className='w-1/2 flex items-center justify-center '>
              <div className='w-[45%] max-w-md'>
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className='bg-[#ffd5c3] px-8 py-14 rounded-3xl shadow-md'
                >
                  <h1 className='font-semibold text-center text-2xl mb-4 tracking-tighter font-poppins'>Add an item to sell</h1>
                  <input
                    className='block w-full px-2 py-2 outline-none rounded-md mb-2 bg-[#FFF1EB]'
                    type="text"
                    placeholder='Your product'
                    name='productname'
                    onChange={(e) => setProductname(e.target.value)}
                  />
                  <textarea
                    className='resize-none block w-full px-2 py-2 outline-none rounded-md mb-2 bg-[#FFF1EB]'
                    type="text"
                    placeholder='Your description'
                    name='productdesc'
                    onChange={(e) => setProductdesc(e.target.value)}
                  >
                  </textarea>
                  <input
                    className='block w-full px-2 py-2 outline-none rounded-md mb-4 bg-[#FFF1EB]'
                    type="text"
                    placeholder='Price'
                    name='productprice'
                    onChange={(e) => setProductprice(e.target.value)}
                  />
                  <button
                    type='submit'
                    className='font-poppins  tracking-tighter w-full bg-green-700 text-white items-center mb-2 px-2 py-2 rounded-md font-semibold'
                  >
                    Add Item
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='bg-[#ffd5c3] p-10 rounded-3xl font-poppins flex items-center flex-col'>
              <h1 className='text-xl font-semibold mb-4'>You must be logged in to sell a product</h1>
              <Link to={"/login"} className='bg-black text-white px-8 py-2 rounded-full'>Login</Link>
            </div>
          </>
        )
      }
    </div>
  )
}

export default SellPage
