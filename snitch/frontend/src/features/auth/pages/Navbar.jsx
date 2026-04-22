import { FaHome, FaHeart, FaShoppingCart, FaComments, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className=" select-none w-full flex justify-center sticky top-0 z-50 bg-[#f5f5f5] py-1">
      
      <div className="w-[90%] bg-white shadow-md rounded-full px-6 py-3 flex items-center justify-between">

        {/* LEFT - LOGO */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-700">
            Snitch
          </span>
        </div>

        {/* RIGHT - NAV LINKS */}
        <div className="flex items-center gap-8 text-gray-600">

          <div className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
            <FaHome />
            <span>Home</span>
          </div>

          <div className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
            <FaHeart />
            <span>Wishlist</span>
          </div>

          <div className="relative flex items-center gap-1 hover:text-pink-500 cursor-pointer">
            <FaShoppingCart />
            <span>Cart</span>

            {/* Badge */}
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
              3
            </span>
          </div>

          <div className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
            <FaComments />
            <span>Messages</span>
          </div>

          <div className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
            <FaUser />
            <span>Profile</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;