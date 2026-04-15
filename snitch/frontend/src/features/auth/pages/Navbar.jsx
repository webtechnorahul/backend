import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <h3>Welcome, {user.name}</h3>
      ) : (
        <h3>Please Login</h3>
      )}
    </div>
  );
};

export default Navbar