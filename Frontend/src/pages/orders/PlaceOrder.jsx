import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container max-w-[1250px] mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="px-4 py-2 text-left w-1/6">Image</th>
        <th className="px-4 py-2 text-left w-2/6">Product</th>
        <th className="px-4 py-2 text-center w-1/6">Quantity</th>
        <th className="px-4 py-2 text-center w-1/6">Price</th>
        <th className="px-4 py-2 text-center w-1/6">Total</th>
      </tr>
    </thead>

    <tbody>
      {cart.cartItems.map((item, index) => (
        <tr key={index} className="border-t">
          <td className="p-4 text-center">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mx-auto" />
          </td>
          <td className="p-4 text-left">
            <Link to={`/product/${item.product}`} className="no-underline hover:text-pink-500">
              {item.name}
            </Link>
          </td>
          <td className="p-4 text-center">{item.qty}</td>
          <td className="p-4 text-center">{item.price.toFixed(2)}</td>
          <td className="p-4 text-center">₹ {(item.qty * item.price).toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 bg-[#D5F5E3]" >
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Items:</span> ₹
                {cart.itemsPrice}
              </li>

              <li>
                <span className="font-semibold mb-4">Shipping:</span> ₹
                {cart.shippingPrice}
              </li>

              <li>
                <span className="font-semibold mb-4">Tax:</span> ₹
                {cart.taxPrice}
              </li>

              <li>
                <span className="font-semibold mb-4">Total:</span> ₹
                {cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4 cursor-pointer"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;