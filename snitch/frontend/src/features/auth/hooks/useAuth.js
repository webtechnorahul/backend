import { useDispatch, useSelector } from "react-redux";
import {setUser,logout,setLoading,setError} from "../state/auth.slice";
import { UserLogin,UserRegister,getUser,GoogleLogin } from "../services/auth.api";
const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  // 🔐 Login
  const login = async ({email,password}) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await UserLogin({email,password});

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
    req.cookies.token = null; // Clear the token cookie on logout
  };

  // get user if you have a token 
  const getCurrentUser=async()=>{
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await getUser();

      dispatch(setUser(response.user));
      return response.user;
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // google login or register will be handled in backend and user will be set in frontend using getuser api after successful login or registration
  const googleLogin = async () => {
    try{
      await GoogleLogin();
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };


  return {
    user,
    loading,
    error,
    login,
    register,
    signOut,
    googleLogin,
    getCurrentUser
  };
};

export default useAuth;