import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import FavoritesCount from "../Products/FavoritesCount";

const MobileNavigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLink = ({ to, children }) => (
    <Link to={to} className="relative flex items-center rounded-lg p-3 transition-colors hover:bg-neutral-700" onClick={toggleMenu}>
      {children}
    </Link>
  );

  return (
    <div className="lg:hidden">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-neutral-900 p-4 text-white">
        <Link to="/" className="text-xl font-bold uppercase">
          ShopCart
        </Link>
        <button onClick={toggleMenu} className="focus:outline-none">
          <AiOutlineMenu size={26} />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-full bg-black bg-opacity-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-neutral-800 text-white shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-700 p-4">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={toggleMenu} className="focus:outline-none">
            <AiOutlineClose size={22} />
          </button>
        </div>
        <nav className="flex flex-col space-y-2 p-4">
          <NavLink to="/"><AiOutlineHome size={22} className="mr-3" />Home</NavLink>
          <NavLink to="/shop"><AiOutlineShopping size={22} className="mr-3" />Shop</NavLink>
          <NavLink to="/cart">
            <AiOutlineShoppingCart size={22} className="mr-3" />
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-pink-500 px-2 py-0.5 text-xs text-white ring-2 ring-accent ring-offset-2 ring-offset-neutral-900">
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
              </span>
            )}
          </NavLink>
          <NavLink to="/favorite">
            <FaHeart size={18} className="mr-3" />
            Favorites
            <FavoritesCount />
          </NavLink>

          {userInfo ? (
            <>
              <div className="pt-4 border-t border-neutral-700">
                <span className="px-3 text-sm font-semibold text-neutral-400">User</span>
              </div>
              <NavLink to="/profile">{userInfo.username}</NavLink>
              {userInfo.isAdmin && (
                <>
                  <div className="pt-4 border-t border-neutral-700">
                    <span className="px-3 text-sm font-semibold text-neutral-400">Admin</span>
                  </div>
                  <NavLink to="/admin/dashboard">Dashboard</NavLink>
                  <NavLink to="/admin/productlist">Products</NavLink>
                  <NavLink to="/admin/categorylist">Category</NavLink>
                  <NavLink to="/admin/orderlist">Orders</NavLink>
                  <NavLink to="/admin/userlist">Users</NavLink>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col space-y-2 pt-6">
              <NavLink to="/login"><AiOutlineLogin size={22} className="mr-3" />Login</NavLink>
              <NavLink to="/register"><AiOutlineUserAdd size={22} className="mr-3" />Register</NavLink>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileNavigation;
