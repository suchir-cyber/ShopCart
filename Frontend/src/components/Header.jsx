import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
        {/* Small Products Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {data.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}
        </div>
        {/* Product Carousel */}
        <div className="lg:col-span-2">
          <ProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Header;