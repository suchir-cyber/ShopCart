import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import { CgProfile } from "react-icons/cg";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className="hidden lg:flex group fixed top-0 left-0 h-full w-16 flex-col justify-between bg-neutral-900 text-white shadow-lg transition-all duration-300 ease-in-out hover:w-64"
    >
      {/* Main Navigation Links */}
      <div className="flex flex-col space-y-2 px-2 py-4">
        <Link
          to="/"
          className="flex items-center rounded-lg py-3 transition-colors hover:bg-neutral-800"
        >
          <AiOutlineHome size={26} className="mr-3" />
          <span className="hidden text-sm font-medium group-hover:inline">HOME</span>
        </Link>

        <Link
          to="/shop"
          className="flex items-center rounded-lg py-3 transition-colors hover:bg-neutral-800"
        >
          <AiOutlineShopping size={26} className="mr-3" />
          <span className="hidden text-sm font-medium group-hover:inline">SHOP</span>
        </Link>

        <Link
          to="/cart"
          className="relative flex items-center rounded-lg py-3 transition-colors hover:bg-neutral-800"
        >
          <AiOutlineShoppingCart size={26} className="mr-3" />
          <span className="hidden text-sm font-medium group-hover:inline">CART</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-pink-500 px-2 py-0.5 text-xs text-white ring-2 ring-accent ring-offset-2 ring-offset-neutral-900">
              {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
            </span>
          )}
        </Link>

        <Link
          to="/favorite"
          className="relative flex items-center rounded-lg py-3 transition-colors hover:bg-neutral-800"
        >
          <FaHeart size={22} className="mr-3 ml-1" />
          <span className="hidden text-sm font-medium group-hover:inline">FAVORITES</span>
          <FavoritesCount />
        </Link>
      </div>

      {/* User Info and Auth Links */}
      <div className="px-2 py-4">
        <div className="relative">
          {userInfo ? (
            <div>
              <button
                onClick={toggleDropdown}
                className="flex w-full items-center rounded-lg p-2 text-left transition-colors hover:bg-neutral-800 focus:outline-none"
              >
                <CgProfile size={26} className="mr-3" />
                <span className="hidden text-sm font-medium group-hover:inline">{userInfo.username}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-48 rounded-md bg-neutral-800 shadow-lg">
                  <ul className="py-1">
                    {userInfo.isAdmin && (
                      <>
                        <li><Link to="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-neutral-700">Dashboard</Link></li>
                        <li><Link to="/admin/productlist" className="block px-4 py-2 text-sm hover:bg-neutral-700">Products</Link></li>
                        <li><Link to="/admin/categorylist" className="block px-4 py-2 text-sm hover:bg-neutral-700">Category</Link></li>
                        <li><Link to="/admin/orderlist" className="block px-4 py-2 text-sm hover:bg-neutral-700">Orders</Link></li>
                        <li><Link to="/admin/userlist" className="block px-4 py-2 text-sm hover:bg-neutral-700">Users</Link></li>
                      </>
                    )}
                    <li><Link to="/profile" className="block px-4 py-2 text-sm hover:bg-neutral-700">Profile</Link></li>
                    <li><button onClick={logoutHandler} className="block w-full px-4 py-2 text-left text-sm hover:bg-neutral-700">Logout</button></li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link to="/login" className="flex items-center rounded-lg py-3 transition-colors hover:bg-neutral-800">
                <AiOutlineLogin size={26} className="mr-3" />
                <span className="hidden text-sm font-medium group-hover:inline">LOGIN</span>
              </Link>
              <Link to="/register" className="flex items-center rounded-lg py-3 transition-colors hover:bg-neutral-800">
                <AiOutlineUserAdd size={26} className="mr-3" />
                <span className="hidden text-sm font-medium group-hover:inline">REGISTER</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;