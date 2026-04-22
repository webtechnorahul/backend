import { FaHome, FaHeart, FaShoppingCart, FaComments,FaUserCircle } from "react-icons/fa";
import useAuth from '../../auth/hooks/useAuth.js'
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Navbar = () => {
  const navigate=useNavigate()
  const {signOut,loading,user,getCurrentUser}=useAuth()
  async function logoutuser() {
    await signOut()
    .then(()=>{
      alert('you are logout successfully')
    })
    navigate('/login');
  }
  const handleuser = async () => {
    const res = await getCurrentUser();
    console.log(res);
    if (!res) {
      navigate('/login');
    }
  }
  useEffect(()=>{
    handleuser();
  },[])

  return (
    <div className="select-none w-full flex justify-center sticky top-0 z-50 bg-[#f5f5f5] py-1">
      
      <div className="w-[90%] bg-white shadow-md rounded-full px-6 py-3 flex items-center justify-between">

        {/* LEFT - LOGO */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-700">
            Snitch
          </span>
        </div>

        {/* RIGHT - NAV LINKS */}
        <div className="flex items-center gap-8 text-gray-600">

          {/* HOME (WRAPPED) */}

          
          {

          user?.role === 'seller' && (
                  <Link
                    to="/seller"
                    className="flex items-center text-gray font-bold gap-1 hover:text-pink-500 cursor-pointer bg-blue-300 py-1 px-3 rounded-2xl"
                  >
                    Dashboard
                  </Link>
                )}

          <div onClick={()=>{
            navigate('/')
          }} className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
            <FaHome />
            <span>Home</span>
          </div>

          <div onClick={()=>navigate('/favourite')} className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
            <FaHeart />
            <span>Wishlist</span>
          </div>

          <div onClick={()=>navigate('/add-cart')} className="relative flex items-center gap-1 hover:text-pink-500 cursor-pointer">
            <FaShoppingCart />
            <span>Cart</span>

            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
              3
            </span>
          </div>

          {/* <div className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
            <FaComments />
            <span>Messages</span>
          </div> */}

          {/* PROFILE (ICON ONLY + HOVER DROPDOWN) */}
          <div className="relative group cursor-pointer">
            
            {/* ICON ONLY */}
            <div className="flex items-center hover:text-pink-500 text-3xl">
              <FaUserCircle />
            </div>

            {/* DROPDOWN */}
            <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-xl p-3 
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                            translate-y-2 group-hover:translate-y-0 
                            transition-all duration-200">

              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100">
                Edit Profile
              </button>

              <button onClick={logoutuser} className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-red-500">
                Logout
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;