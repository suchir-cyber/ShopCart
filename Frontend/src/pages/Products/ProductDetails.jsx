import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";


const ProductDetails = () => {

    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
  
    const {
        data: product,
        isLoading,
        refetch,
        error,
      } = useGetProductDetailsQuery(productId);
    
    const { userInfo } = useSelector((state) => state.auth);
    
    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  return (
    <>
        
        <div>
        <Link
          to="/"
          className="text-black font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
        </div>
    </>
  )
}

export default ProductDetails;
