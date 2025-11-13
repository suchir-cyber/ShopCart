import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
    };
  
    return (
      <div className="mb-4 lg:block xl:block md:block">
        {isLoading ? null : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Slider
            {...settings}
            className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
            
          >
            {products.map(
              ({
                image,
                _id,
                name,
                price,
                description,
                brand,
                createdAt,
                numReviews,
                rating,
                quantity,
                countInStock,
              }) => (
                <div key={_id}>
                  <img
                    src={image}
                    alt={name}
                    className="w-full rounded-lg object-cover h-[30rem]"
                  />
  
                  <div className="mt-4 grid grid-cols-2 gap-x-4">
                    <div>
                      <h2 className="text-lg font-bold text-neutral-800">{name}</h2>
                      <p className="text-2xl font-extrabold text-primary">₹ {price}</p>
                      <p className="mt-2 text-sm text-neutral-600">
                        {description.substring(0, 170)} ...
                      </p>
                    </div>

                    <div className="flex flex-col justify-between text-sm">
                      <div className="space-y-2">
                        <h3 className="flex items-center">
                          <FaStore className="mr-2 text-neutral-500" /> <strong>Brand:</strong>
                          <span className="ml-2">{brand}</span>
                        </h3>
                        <h3 className="flex items-center">
                          <FaClock className="mr-2 text-neutral-500" /> <strong>Added:</strong>
                          <span className="ml-2">{moment(createdAt).fromNow()}</span>
                        </h3>
                        <h3 className="flex items-center">
                          <FaStar className="mr-2 text-neutral-500" /> <strong>Reviews:</strong>
                          <span className="ml-2">{numReviews}</span>
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <h3 className="flex items-center">
                          <FaStar className="mr-2 text-neutral-500" /> <strong>Ratings:</strong>
                          <span className="ml-2">{Math.round(rating)}</span>
                        </h3>
                        <h3 className="flex items-center">
                          <FaShoppingCart className="mr-2 text-neutral-500" /> <strong>Quantity:</strong>
                          <span className="ml-2">{quantity}</span>
                        </h3>
                        <h3 className="flex items-center">
                          <FaBox className="mr-2 text-neutral-500" /> <strong>In Stock:</strong>
                          <span className="ml-2">{countInStock}</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </Slider>
        )}
      </div>
    );
  };
  
  export default ProductCarousel;