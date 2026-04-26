import { FaHome, FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import useAuth from '../../auth/hooks/useAuth.js'
import useCart from '../../cart/hooks/useCart.js'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user, getCurrentUser } = useAuth();
  const { cart } = useCart();

  async function logoutuser() {
    await signOut();
    navigate('/login');
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="select-none w-full sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4 px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl font-black text-gray-900 tracking-tighter group-hover:text-indigo-500 transition-colors">
            SNITCH<span className="text-indigo-500">.</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-10">
          
          <div className="flex items-center gap-8 text-sm font-black uppercase tracking-widest">
            <Link 
              to="/" 
              className={`flex items-center gap-2 transition-all ${isActive('/') ? 'text-indigo-500' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <FaHome className="text-lg" />
              <span className="hidden md:inline">Home</span>
            </Link>

            <Link 
              to="/favourite" 
              className={`flex items-center gap-2 transition-all ${isActive('/favourite') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <FaHeart className="text-lg" />
              <span className="hidden md:inline">Wishlist</span>
            </Link>

            <Link 
              to="/cart" 
              className={`relative flex items-center gap-2 transition-all ${isActive('/cart') ? 'text-indigo-500' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <FaShoppingCart className="text-lg" />
              <span className="hidden md:inline">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-3 -right-4 bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full border-2 border-white">
                  {cart.length}
                </span>
              )}
            </Link>

            {user?.role === 'seller' && (
              <Link
                to="/seller"
                className={`px-4 py-2 rounded-xl transition-all ${isActive('/seller') ? 'bg-indigo-600 text-white' : 'bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white'}`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* PROFILE */}
          <div className="relative group">
            <div className="flex items-center text-gray-500 hover:text-gray-900 text-3xl cursor-pointer transition-colors">
              <FaUserCircle />
            </div>

            {/* DROPDOWN */}
            <div className="absolute right-0 mt-4 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl p-3 
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                            translate-y-4 group-hover:translate-y-0 
                            transition-all duration-300">
              
              <div className="px-4 py-3 border-b border-gray-100 mb-2">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Logged in as</p>
                <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'User'}</p>
              </div>

              <Link to="/profile" className="block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-900 font-bold transition-all">
                Edit Profile
              </Link>

              <button 
                onClick={logoutuser} 
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-500 font-bold transition-all mt-1"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;