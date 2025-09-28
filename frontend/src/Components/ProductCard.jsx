import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
  return (
    <div
      className="bg-primary-dark border border-white/10 max-w-md p-6 rounded-2xl font-poppins flex flex-col hover:scale-105 duration-300 max-h-96"
    >
      <div
        className="rounded-2xl overflow-hidden w-full h-40 mb-2"
      >
        <img
          src={`${product?.productImageurl}`}
          alt="product"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h1
            className="text-xl text-textcolor-primary font-semibold"
          >
            {product.productname}
          </h1>
          <h6
            className="text-lg text-textcolor-secondary font-semibold"
          >
            {'\u20B9'} {product.productprice}
          </h6>
        </div>
      </div>
      <h3
        className="text-sm text-textcolor-secondary tracking-tighter mb-4 text-opacity-75 line-clamp-2"
      >
        {product.productdesc}
      </h3>
      <Link
        to={`product/${product._id}`}
        className="text-md font-semibold font-poppins bg-black text-accent-dark hover:text-accent-light py-2 px-6 rounded-full self-start"
      >
        View Details
      </Link>
    </div>
  )
}

export default ProductCard
