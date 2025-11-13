import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full rounded-t-lg object-cover"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <div className="flex items-center justify-between">
            <h2 className="truncate text-lg font-semibold text-neutral-800" title={product.name}>
              {product.name}
            </h2>
            <span className="ml-2 rounded-full bg-primary px-2.5 py-0.5 text-sm font-medium text-white">
              ₹{product.price}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;