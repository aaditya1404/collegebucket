
const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#ffd5c3] h-[180px] max-w-md p-8 rounded-2xl font-poppins flex flex-col">
      <div>
        <img src={`${product.productImageurl}`} alt="product image" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{product.productname}</h1>
          <h6 className="text-lg font-semibold">{'\u20B9'} {product.productprice}</h6>
        </div>
      </div>
      <h3 className="text-sm tracking-tighter mb-4 text-black text-opacity-75 line-clamp-2">{product.productdesc}</h3>
      <button className="text-md font-semibold font-poppins bg-black text-white py-1 px-6 rounded-full self-start">Buy</button>
    </div>
  )
}

export default ProductCard
