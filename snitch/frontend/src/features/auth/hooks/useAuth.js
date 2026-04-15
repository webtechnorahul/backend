import { useDispatch, useSelector } from "react-redux";
import {setUser,logout,setLoading,setError} from "../state/auth.slice";
import { UserLogin,UserRegister } from "../services/auth.api";
const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  // 🔐 Login
  const login = async ({email,password}) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await UserLogin({email,password});


      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      dispatch(setUser(response.user));
      return response.user;
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 📝 Register
  const register = async ({name,email,password,role}) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await UserRegister({name,email,password,role});

      dispatch(setUser(res.user));
      return res.user;
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🚪 Logout
  const signOut = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // optional
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    signOut,
  };
};

export default useAuth;