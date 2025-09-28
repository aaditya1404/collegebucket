import { useState } from 'react'
import { Link } from 'react-router-dom';

const SellPage = () => {

  const [productname, setProductname] = useState("");
  const [productdesc, setProductdesc] = useState("");
  const [productprice, setProductprice] = useState("");
  const [img, setImg] = useState();
  const [logedInUser, setLogedInUser] = useState(() => {
    const userString = localStorage.getItem("user")
    return userString ? JSON.parse(userString) : null
  });

  async function addProduct() {
    if (!img) {
      alert("Image is required");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "productimageupload");
      const response = await fetch(`https://api.cloudinary.com/v1_1/dpa4je7qw/upload`, {
        method: "POST",
        body: formData,
      })
      const imageUpload = await response.json();
      let res = await fetch("http://localhost:8000/product/add", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          productname,
          productdesc,
          productprice,
          productImageurl: imageUpload.secure_url,
          listedByUserId: logedInUser?._id
        })
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.log("Error adding the product", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    addProduct();
  }

  return (
    <div className=' flex items-center justify-center h-screen w-full'>
      {
        logedInUser ? (
          <>
            <div className='flex items-center justify-center lg:pt-6 w-full'>
              <div className='lg:max-w-md w-full mx-4'>
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className='bg-primary-dark border border-white/10 px-8 py-14 rounded-3xl shadow-md text-white'
                >
                  <h1 className='font-semibold text-center text-2xl mb-4 tracking-tighter font-poppins text-textcolor-primary'>Add an item</h1>
                  <input
                    className='block w-full px-2 py-2 outline-none rounded-md mb-2 bg-primary-light'
                    type="text"
                    placeholder='Your product'
                    name='productname'
                    onChange={(e) => setProductname(e.target.value)}
                  />
                  <textarea
                    className='resize-none block w-full px-2 py-2 outline-none rounded-md mb-2 bg-primary-light'
                    type="text"
                    placeholder='Your description'
                    name='productdesc'
                    onChange={(e) => setProductdesc(e.target.value)}
                  >
                  </textarea>
                  <input
                    className='block w-full px-2 py-2 outline-none rounded-md mb-2 bg-primary-light'
                    type="text"
                    placeholder='Price'
                    name='productprice'
                    onChange={(e) => setProductprice(e.target.value)}
                  />
                  <input
                    className='block w-full px-2 py-2 outline-none rounded-md mb-4 bg-primary-light text-textcolor-secondary file:bg-primary-light file:rounded-md file:border-none file:cursor-pointer file:text-textcolor-secondary hover:file:bg-primary-dark cursor-pointer'
                    type="file"
                    name='productImage'
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                  <button
                    type='submit'
                    className='font-poppins  tracking-tighter w-full bg-black text-white items-center mb-2 px-2 py-2 rounded-md font-semibold hover:text-accent-dark duration-200'
                  >
                    Add Item
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='bg-primary-dark border border-white/10 p-10 rounded-3xl font-poppins flex items-center flex-col mx-4'>
              <h1 className='text-xl font-semibold mb-4 text-textcolor-secondary'>You must be logged in to sell a product</h1>
              <Link
                to={"/login"}
                className='bg-black hover:text-accent-dark duration-150 hover:scale-105 text-white px-8 py-2 rounded-full'
              >
                Login
              </Link>
            </div>
          </>
        )
      }
    </div>
  )
}

export default SellPage
